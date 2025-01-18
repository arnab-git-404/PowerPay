from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import (
    CustomerSignup,
    CustomerLogin,
    Address,
    CustomerDashboard
)
from services import CustomerHandler

router = APIRouter()
customerObj = CustomerHandler()


@router.post("/signup")
async def customer_signup(customer: CustomerSignup):
    result = customerObj.customerSignup(customer.model_dump())
    return result


@router.post("/login")
async def customer_login(customer: CustomerLogin):

    user = customerObj.customerLogin(customer.model_dump())
    if user:
        return JSONResponse(
            status_code=200,
            content={
                "message": "Customer logged in successfully",
                "data": user
            }
        )
    raise HTTPException(status_code=400, detail="Invalid credentials")


@router.post("/set_address")
async def set_address(address: Address):
    result = customerObj.setAddress(address.model_dump())
    if result:
        return JSONResponse(
            status_code=200,
            content={
                "message": "Address saved successfully"
            }
        )
    raise HTTPException(status_code=404, detail="Customer not found")


@router.post("/dashboard")
async def customer_dashboard(dashboard: CustomerDashboard):
    customer = customerObj.getCustomer(dashboard.accountNumber)
    if customer:
        return JSONResponse(
            status_code=200,
            content={
                "message": "Customer dashboard data",
                "data": customer
            }
        )
    raise HTTPException(status_code=404, detail="Customer not found")
