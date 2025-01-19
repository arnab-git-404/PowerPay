import json
from typing import Dict, Union, Any


class CompanyHandler:
    def __init__(self, company_file: str = "data/company.json"):
        self.company_file = company_file

    def company_login(self, data: dict) -> Union[Dict[str, Any], bool]:
        try:
            with open(self.company_file, "r") as file:
                company = json.load(file)
            section = data["type"]
            user = [
                item for item in company[section]
                if item.get("email") == data["email"]
            ]
            if user and user[0]["password"] == data["password"]:
                return True
            return False
        except FileNotFoundError:
            return False
        except json.JSONDecodeError:
            return False
