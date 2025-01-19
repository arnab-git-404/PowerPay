from pydantic import BaseModel, EmailStr, model_validator
from typing import Optional


class CustomerSignup(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    cpassword: str


class CustomerLogin(BaseModel):
    email: Optional[EmailStr] = None
    account_number: Optional[str] = None
    password: str

    @model_validator(mode='before')
    def check_email_or_account_number(cls, values):
        if not values.get('email') and not values.get('account_number'):
            raise ValueError('Either email or account number must be provided')
        return values


class Address(BaseModel):
    account_number: str
    house_no: str
    street: str
    city: str
    state: str
    zip: str
    branch: str


class CustomerDashboard(BaseModel):
    account_number: str


class BranchDashboard(BaseModel):
    branch_code: str


class DeleteAccount(BaseModel):
    account_number: str


class CompanyLogin(BaseModel):
    email: EmailStr
    password: str
    type: str
