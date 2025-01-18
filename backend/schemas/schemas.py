from pydantic import BaseModel, EmailStr


class CustomerSignup(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    cpassword: str


class CustomerLogin(BaseModel):
    email: str
    password: str


class Address(BaseModel):
    accountNumber: str
    house_no: str
    street: str
    city: str
    state: str
    zip: str
    branch: str


class CustomerDashboard(BaseModel):
    accountNumber: str


class BranchDashboard(BaseModel):
    branchCode: str


class DeleteAccount(BaseModel):
    accountNumber: str


class CompanyLogin(BaseModel):
    email: EmailStr
    password: str
    type: str
