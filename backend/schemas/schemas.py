from pydantic import BaseModel, EmailStr
from typing import List


class CustomerSignup(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    cpassword: str


class CustomerLogin(BaseModel):
    email: EmailStr
    password: str


class Address(BaseModel):
    house_no: str
    street: str
    city: str
    state: str
    zip: str
    branch: str


class CustomerDashboard(BaseModel):
    name: str
    accountNumber: str
    email: EmailStr
    phone: str
    address: Address
    balance: float
    dueAmount: float
    dueDate: str
    payment_history: List[dict]


class CompanyLogin(BaseModel):
    email: EmailStr
    password: str
    type: str


class BranchDashboard(BaseModel):
    branch: str
    branch_code: str
    branch_address: Address
    branch_employees: List[dict]
    branch_customers: List[dict]


class DeleteAccount(BaseModel):
    account_no: str
