import os
import time
from time import sleep

import google.generativeai as genai
import base64

from app.db import LocalDatabase


def load_book_text(book_path):
    with open(book_path, "rb") as f:
        book_data = base64.standard_b64encode(f.read()).decode("utf-8")
    return book_data


class GeminiSummarizer:
    def __init__(self, api_key):
        self.api_key = api_key
        genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        # TODO tune the prompt
        self.prompt = ("Summarize the following book text into 10 or more chronological paragraphs (with descriptive paragraph titles). "
                       "The paragraphs should be quite detailed, including examples and important quotes from the text. "
                       "Assure the output length exceeds 10 percent of original text length. Format into markdown. \n")

        self.last_request_ts = None # Abstract out into its own timer request class

    def summarize(self, book_file_path):

        # TODO determine file type from path and load and upload pdfs accordingly

        book_text = load_book_text(book_file_path)
        response = self.model.generate_content([{'mime_type': 'text/plain', 'data': book_text}, self.prompt])

        print(f"Summarized length of {book_file_path} from {len(book_text)} => {len(response.text)}")
        return response.text

    def summarize_batch(self, book_text_keys, save_dir=None, db=None):
        local_file_paths = [convert_path_key_to_file_path(path) for path in book_text_keys]
        summaries = []
        if save_dir:
            os.makedirs(save_dir, exist_ok=True)

        for i, book_path in enumerate(book_text_keys):
            try:
                summary = self.summarize(local_file_paths[i])
                summaries.append(summary)
                if save_dir:
                    save_path = f"{save_dir}/{book_path.replace('/', '_')}.md"
                    with open(save_path, "w") as f:
                        f.write(summary)

                    localDBEntry = db.get(book_path) if db else None
                    if localDBEntry:
                        localDBEntry["summary_path"] = save_path
            except Exception as e:
                print(f"Error summarizing {book_path}: {e}")

            sleep(4.1) # Gemini API rate limit is 15 Req/min

        return summaries


def convert_path_key_to_file_path(key):
    converted_key = key.replace("/", "_")
    return f"downloaded_books/{converted_key}.txt"

if __name__ == '__main__':
    os.environ["GEMINI_API_KEY"] = "KEY"
    obj = GeminiSummarizer(os.environ["GEMINI_API_KEY"])

    localDb = LocalDatabase()
    all_book_paths = localDb.keys()
    print(f"Summarizing {len(all_book_paths)}")

    start_time = time.time()
    summaries = obj.summarize_batch(all_book_paths, save_dir="summaries", db=localDb)

    print(f"{len(summaries)} summaries generated in {(time.time() - start_time)/60} mins")
