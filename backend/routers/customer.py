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
customer_handler = CustomerHandler()


@router.post("/signup")
async def customer_signup(customer: CustomerSignup):
    result, message = customer_handler.customer_signup(customer.model_dump())
    if result:
        return JSONResponse(
            status_code=200,
            content={
                "message": message,
                "account_number": result
            }
        )
    raise HTTPException(status_code=400, detail=message)
    return result


@router.post("/login")
async def customer_login(customer: CustomerLogin):
    user = customer_handler.customer_login(customer.model_dump())
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
    result = customer_handler.set_address(address.model_dump())
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
    customer = customer_handler.get_customer(dashboard.account_number)
    if customer:
        return JSONResponse(
            status_code=200,
            content={
                "message": "Customer dashboard data",
                "data": customer
            }
        )
    raise HTTPException(status_code=404, detail="Customer not found")
