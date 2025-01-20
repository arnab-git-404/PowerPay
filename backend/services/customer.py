import json
import random
from typing import List, Dict, Any, Union
import jwt
from datetime import datetime, timedelta

SECRET_KEY = "HelloFromSayan"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class CustomerHandler:
    def __init__(
        self,
        customer_file: str = "data/customer.json",
        branch_file: str = "data/branch.json"
    ):
        self.customer_file = customer_file
        self.branch_file = branch_file

    def customer_signup(
        self, data: dict
    ) -> Union[Dict[str, Any], str]:
        customer = self.load_customer()
        if data["password"] != data["cpassword"]:
            return None, "Password mismatch"

        if self.user_exists(customer, data["email"], data["phone"]):
            return None, "User already exists"

        acc = self.generate_account_number(customer)
        data = {
            "name": data["name"],
            "account_number": str(acc),
            "email": data["email"],
            "phone": data["phone"],
            "password": data["password"],
            "address": {},
            "due_amount": 0,
            "due_date": "",
            "payment_history": []
        }

        customer.append(data)
        self.dump_customer(customer)
        access_token = self.create_access_token(data={"sub": data["email"]})
        data["token"] = access_token
        return data, "User created successfully"

    def customer_login(self, data: dict) -> bool:
        customer = self.load_customer()
        if data["email"]:
            key = "email"
            value = data["email"]
        else:
            key = "account_number"
            value = data["account_number"]
        user = self.find_user(customer, value, key)
        if user and user[0]["password"] == data["password"]:
            access_token = self.create_access_token(
                data={"sub": user[0]["email"]}
            )
            user[0]["token"] = access_token
            return user[0]
        return None

    def set_address(self, data: dict) -> bool:
        customer = self.load_customer()
        branch = self.load_branch()
        user = self.find_user(
            customer, data["account_number"], key="account_number"
        )
        if user:
            user[0]["address"] = {
                key: value for key, value in data.items()
                if key != "account_number"
            }
            branch[data["branch"]]["branch_customers"].append(
                {
                    "account_number": data["account_number"],
                    "name": user[0]["name"],
                    "due_amount": user[0]["due_amount"],
                    "due_date": user[0]["due_date"]
                }
            )
            self.dump_customer(customer)
            self.dump_branch(branch)
            return True
        return False

    def get_customer(self, account_number: str) -> Union[Dict[str, Any], None]:
        customer = self.load_customer()
        user = self.find_user(customer, account_number, key="account_number")
        if user:
            return user[0]
        return None

    def delete_account(self, account_number: str) -> bool:
        customer = self.load_customer()
        branch = self.load_branch()
        user = self.find_user(customer, account_number, key="account_number")
        if user:
            customer.remove(user[0])
            branch_code = user[0]["address"]["branch"]
            branch[branch_code]["branch_customers"] = [
                item for item in branch[branch_code]["branch_customers"]
                if item["account_number"] != account_number
            ]
            self.dump_customer(customer)
            self.dump_branch(branch)
            return True
        return False

    # Utility functions
    def load_customer(self) -> List[Dict[str, Any]]:
        try:
            with open(self.customer_file, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            return []

    def dump_customer(self, customer: List[Dict[str, Any]]) -> None:
        with open(self.customer_file, "w") as file:
            json.dump(customer, file, indent=4)

    def load_branch(self) -> Dict[str, Any]:
        try:
            with open(self.branch_file, "r") as file:
                return json.load(file)
        except FileNotFoundError:
            return {}

    def dump_branch(self, branch: Dict[str, Any]) -> None:
        with open(self.branch_file, "w") as file:
            json.dump(branch, file, indent=4)

    def user_exists(
        self, customer: List[Dict[str, Any]], email: str, phone: str
    ) -> bool:
        return any(
            item for item in customer if item.get("email") == email
            or item.get("phone") == phone
        )

    def find_user(
        self, customer: List[Dict[str, Any]], value: str, key: str = "email"
    ) -> List[Dict[str, Any]]:
        return [item for item in customer if item.get(key) == value]

    def generate_account_number(self, customer: List[Dict[str, Any]]) -> int:
        acc = random.randint(111111111, 999999999)
        while any(
            item for item in customer
            if item.get("account_number") == acc
        ):
            acc = random.randint(111111111, 999999999)
        return acc

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return encoded_jwt
