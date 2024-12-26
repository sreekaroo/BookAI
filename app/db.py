import json
import os

DB_FILE_PATH = 'db.json'


class LocalDatabase:
    def __init__(self, db_file_path=DB_FILE_PATH):
        db = json.load(open(db_file_path)) if os.path.exists('db.json') else {}
        self.db = db

    def save(self):
        with open(DB_FILE_PATH, 'w') as dbfile:
            json.dump(self.db, dbfile, indent=4)

    def get(self, key):
        return self.db.get(key)

    def set(self, key, value):
        self.db[key] = value
        self.save()

    def keys(self):
        return self.db.keys()

    def delete(self, key):
        del self.db[key]
        self.save()