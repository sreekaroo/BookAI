import os
from dotenv import load_dotenv

from groq import Groq

MODEL = "llama3-8b-8192"


def load_env_vars(file_path=".env"):
    """
    Load environment variables from a specified file.

    Args:
        file_path (str): Path to the .env file. Default is ".env".
    """
    try:
        # Load environment variables from the file
        load_dotenv(file_path)
        print(f"Environment variables loaded from {file_path}")
    except Exception as e:
        print(f"Error loading environment variables: {e}")


if __name__ == '__main__':
    print("Starting")
    load_env_vars()

    client = Groq(
        api_key=os.environ.get("GROQ_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Explain the importance of fast language models",
            }
        ],
        model=MODEL,
    )

    print(chat_completion.choices[0].message.content)
