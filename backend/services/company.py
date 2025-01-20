import json
from typing import Dict, Union, Any
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "HelloFromSayan"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class CompanyHandler:
    def __init__(self, company_file: str = "data/company.json"):
        self.company_file = company_file

    def company_login(self, data: dict) -> Union[Dict[str, Any], bool]:
        company = self.load_company()
        section = data["type"]
        user = [
            item for item in company[section]
            if item.get("email") == data["email"]
        ]
        if user and user[0]["password"] == data["password"]:
            return True
        return False

    # Utility functions
    def load_company(self) -> Dict[str, Any]:
        try:
            with open(self.company_file, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            return {}
        except json.JSONDecodeError:
            return {}

    def dump_company(self, company: Dict[str, Any]) -> None:
        with open(self.company_file, "w") as file:
            json.dump(company, file, indent=4)

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
