""" Write a quick script that puts the summarizerPath into the appropriate place in the db.json file For example, the summarizer path is the path to summaries/summary"""
from pathlib import Path

from app.db import LocalDatabase


def get_summaries_file_names():
    summaries_dir = Path("../backend/init_scripts/summaries")
    return [str(p) for p in summaries_dir.glob("*.md")]

def convert_file_name_to_key(file_name):
    return file_name.split("/")[-1].replace(".md", "").replace("_", "/")

def new_key_function(file_name):
    """ Hashes the filename to a unique key """
    return str(abs(hash(file_name)) % (10 ** 8))

base_path = "../backend/init_scripts/"

oldDB = LocalDatabase(f"{base_path}tempDB.json")
newDB = LocalDatabase(f"{base_path}metadata.json")
summaries = get_summaries_file_names()
summary_file_name_converted = [convert_file_name_to_key(summary) for summary in summaries]
for i, summary in enumerate(summaries):
    old_key_name = summary_file_name_converted[i]
    new_key_name = new_key_function(old_key_name)

    current_db_val = oldDB.get(old_key_name)

    old_file_name = summaries[i]
    new_file_name = f"{base_path}summaries/{new_key_name}.md"
    Path(old_file_name).rename(new_file_name)

    current_db_val["summary_path"] = f"summaries/{new_key_name}.md"
    newDB.set(new_key_name, current_db_val)

print("Done")


