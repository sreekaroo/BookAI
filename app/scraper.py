# Description: This module is responsible for scraping the Project Gutenberg website for books and downloading them to local storage.
import re

import requests

from app.db import LocalDatabase
from app.spoofer import Spoofer
from bs4 import BeautifulSoup

BOOK_INDEX_URL = "https://www.gutenberg.org/ebooks/bookshelf/"
BASE_URL  = "https://www.gutenberg.org"

BOOK_PAGE_TEMPLATE = "https://www.gutenberg.org/ebooks/14975"

# TODO filter out the links that are fiction and only return nonfiction book shelves
class Scraper:
    def __init__(self):
        self.spoofer = Spoofer()
        self.db = LocalDatabase()

    def filter_nonfiction(self, bookshelves):
        if bookshelves:
            return bookshelves[:5]
        return bookshelves

    def scrape_for_bookshelves(self):
        """
        Scrape the bookshelf index page for all bookshelves
        :return: list of bookshelf links for further scraping
        """

        headers = self.spoofer.spoof_headers()
        proxy = self.spoofer.spoof_proxy()

        response = requests.get(BOOK_INDEX_URL, headers=headers, proxies=proxy)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        links = soup.find_all("a", href=True)

        pattern = r"^/ebooks/bookshelf/\d+$"
        bookshelf_links = [link["href"] for link in links if re.match(pattern, link["href"])]

        filtered_bookshelves = self.filter_nonfiction(bookshelf_links)
        return filtered_bookshelves

    def get_book_links(self, shelf_url):
        headers = self.spoofer.spoof_headers()
        proxy = self.spoofer.spoof_proxy()

        response = requests.get(BASE_URL+ shelf_url, headers=headers, proxies=proxy)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        links = soup.find_all("a", href=True)

        pattern = r"^/ebooks/\d+$"
        book_links = [link["href"] for link in links if re.match(pattern, link["href"])]


        return book_links

    def scrape_for_books(self):

        bookshelves = self.scrape_for_bookshelves()

        for shelf in bookshelves:
            book_links = self.get_book_links(shelf)

            for book_url in book_links:

                headers = self.spoofer.spoof_headers()
                proxy = self.spoofer.spoof_proxy()

                response = requests.get(BASE_URL + book_url, headers=headers, proxies=proxy)
                response.raise_for_status()
                soup = BeautifulSoup(response.text, "html.parser")
                links = soup.find_all("a", href=True)
                txt_links = [link["href"] for link in links if link["href"].endswith(".txt.utf-8")]

                if len(txt_links) == 1:
                    book_metadata = {
                        "title": soup.find("h1").text,
                        "url": book_url,
                        "txt_url": txt_links[0]
                    }
                    self.db.set(book_url, book_metadata)


    def download_book(self):
        pass

    def run(self):
        self.scrape_for_books()

if __name__ == "__main__":
    scraper = Scraper()
    scraper.run()

