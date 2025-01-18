import json
import random
from fastapi import HTTPException
from fastapi.responses import JSONResponse


class CustomerHandler:
    def customerSignup(self, data: dict) -> dict:
        customer = self.loadCustomer()
        if data["password"] != data["cpassword"]:
            return HTTPException(status_code=400, detail="Password mismatch")

        if [
            item for item in customer
            if item.get("email") == data["email"]
        ] or [
            item for item in customer
            if item.get("phone") == data["phone"]
        ]:
            return HTTPException(status_code=400, detail="User already exists")

        acc = random.randint(111111111, 999999999)
        while [
            item for item in customer
            if item.get("accountNumber") == acc
        ]:
            acc = random.randint(111111111, 999999999)

        data = {
            "name": data["name"],
            "accountNumber": str(acc),
            "email": data["email"],
            "phone": data["phone"],
            "password": data["password"],
            "address": {},
            "dueAmount": 0,
            "dueDate": "",
            "paymentHistory": []
        }

        customer.append(data)
        self.dumpCustomer(customer)
        return JSONResponse(
            status_code=200,
            content={
                "message": "User created successfully",
                "accountNumber": str(acc)
            }
        )

    def customerLogin(self, data: dict) -> dict:
        customer = self.loadCustomer()
        user = [
            item for item in customer
            if item.get("email") == data["email"]
        ] or [
            item for item in customer
            if item.get("accountNumber") == data["email"]
        ]
        if user and user[0]["password"] == data["password"]:
            return True
        return False

    def setAddress(self, data: dict) -> dict:
        customer = self.loadCustomer()
        with open("data/branch.json", "r") as file:
            branch = json.load(file)
        user = [
            item for item in customer
            if item.get("accountNumber") == data["accountNumber"]
        ]
        if user:
            user[0]["address"] = {
                key: value for key, value in data.items()
                if key != "accountNumber"
            }
            branch[data["branch"]]["branchCustomers"].append(
                {
                    "accountNumber": data["accountNumber"],
                    "name": user[0]["name"],
                    "dueAmount": user[0]["dueAmount"],
                    "dueDate": user[0]["dueDate"]
                }
            )
            self.dumpCustomer(customer)
            with open("data/branch.json", "w") as file:
                json.dump(branch, file, indent=4)
            return True
        return False

    def getCustomer(self, accountNumber: str) -> dict:
        customer = self.loadCustomer()
        user = [
            item for item in customer
            if item.get("accountNumber") == accountNumber
        ]
        if user:
            return user[0]
        return {"message": "User not found with the given account number"}

    def deleteAccount(self, accountNumber: str) -> dict:
        customer = self.loadCustomer()
        result = [
            item for item in customer
            if item.get("accountNumber") == accountNumber
        ]
        if result:
            customer.remove(result[0])
            self.dumpCustomer(customer)
            return True
        return False

    def loadCustomer(self):
        with open("data/customer.json", "r") as file:
            customer = json.load(file)

        return customer

    def dumpCustomer(self, customer):
        with open("data/customer.json", "w") as file:
            json.dump(customer, file, indent=4)


class BranchHandler:
    def branchData(self, branch_code: str) -> dict:
        with open("data/branch.json", "r") as file:
            branch = json.load(file)
        if branch_code in branch:
            return branch[branch_code]
        return False


class CompanyHandler:
    def companyLogin(self, data: dict) -> dict:
        with open("data/company.json", "r") as file:
            company = json.load(file)
        section = data["type"]
        user = [
            item for item in company[section]
            if item.get("email") == data["email"]
        ]
        if user and user[0]["password"] == data["password"]:
            return True
        return False
