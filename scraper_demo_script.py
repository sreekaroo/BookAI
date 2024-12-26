import os
import time
import random
from urllib.request import Request, urlopen

import requests
from fake_useragent import UserAgent
from bs4 import BeautifulSoup

EXAMPLE_URL = "https://www.gutenberg.org/ebooks/98"
BASEURL = "https://www.gutenberg.org"
DOWNLOAD_DIR = "downloaded_files"
os.makedirs(DOWNLOAD_DIR, exist_ok=True)

ua = UserAgent()
proxies = []
proxy = None

def download_file(file_url, save_path):
    try:
        headers = {"User-Agent": ua.random}
        response = requests.get(file_url, headers=headers, proxies=proxy, stream=True)
        response.raise_for_status()
        with open(save_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"Downloaded: {file_url}")
    except Exception as e:
        print(f"Failed to download {file_url}: {e}")

def scrape_and_download(base_url):
    try:
        # Send a GET request to the webpage
        response = requests.get('https://www.sslproxies.org/')
        response.raise_for_status()

        # Parse the HTML content
        soup = BeautifulSoup(response.text, "html.parser")

        # Locate the table containing proxy information
        table = soup.find("table", {"class": "table table-striped table-bordered"})

        # Extract table rows (skipping the header row)
        rows = table.find("tbody").find_all("tr")

        proxies = [{'ip': row.find_all('td')[0].string, 'port': row.find_all('td')[1].string} for row in rows]

        proxy = random.choice(proxies)
        print(proxy)

        headers = {"User-Agent": ua.random}
        response = requests.get(base_url, headers=headers, proxies=proxy)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        links = soup.find_all("a", href=True)
        txt_links = [link["href"] for link in links if link["href"].endswith(".txt.utf-8")]
        print(txt_links)

        for link in txt_links:
            file_url = link if link.startswith("http") else f"{BASEURL.rstrip('/')}/{link.lstrip('/')}"
            file_name = os.path.basename(file_url)
            save_path = os.path.join(DOWNLOAD_DIR, file_name)
            download_file(file_url, save_path)
            time.sleep(random.uniform(1, 3))  # Add random delay
    except Exception as e:
        print(f"An error occurred: {e}")

scrape_and_download(EXAMPLE_URL)


