import os
import time
import random
from urllib.request import Request, urlopen

import requests
from fake_useragent import UserAgent
from bs4 import BeautifulSoup
from datetime import datetime

class Spoofer:
    def __init__(self):
        self.config = {
            'proxy_update_interval': 600
        }

        self.ua = UserAgent()

        self.proxies = self.get_proxies()
        self.proxy_update_ts = datetime.now()

    def spoof_headers(self, headers=None):
        # spoof headrs for a request
        spoofed_headers = headers or {}
        spoofed_headers['User-Agent'] = self.ua.random
        return spoofed_headers

    def spoof_proxy(self):
        # spoof proxy for a request
        if (datetime.now() - self.proxy_update_ts).seconds > self.config['proxy_update_interval']:
            self.proxies = self.get_proxies()
            self.proxy_update_ts = datetime.now()

        if not self.proxies:
            return []

        rand_idx = random.randint(0, len(self.proxies) - 1)
        return self.proxies[rand_idx]

    def spoof_user_agent(self):
        # spoof user agent for a request
        return self.ua.random

    @staticmethod
    def get_proxies() -> list:
        # Send a GET request to the webpage
        response = requests.get('https://www.sslproxies.org/')
        response.raise_for_status()

        # Parse the HTML content
        soup = BeautifulSoup(response.text, "html.parser")
        # Locate the table containing proxy information
        table = soup.find("table", {"class": "table table-striped table-bordered"})
        # Extract table rows (skipping the header row)
        rows = table.find("tbody").find_all("tr")

        proxies = []
        for row in rows:
            ip = row.find_all('td')[0].string
            port = row.find_all('td')[1].string
            proxies.append({'ip': ip, 'port': port})

        return proxies
