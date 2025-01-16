from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from schemas.schemas import (
    CustomerSignup,
    CustomerLogin,
    Address,
    CustomerDashboard
)

router = APIRouter()
client = AsyncIOMotorClient("MONGODB_URL")
database = client.your_database_name
customers_collection = database.get_collection("customers")
addresses_collection = database.get_collection("addresses")


@router.post("/signup")
async def customer_signup(customer: CustomerSignup):
    result = await customers_collection.insert_one(customer.model_dump())
    return {
        "message": "Customer signed up successfully",
        "id": str(result.inserted_id)
    }


@router.post("/login")
async def customer_login(customer: CustomerLogin):
    user = await customers_collection.find_one({"email": customer.email})
    if user and user["password"] == customer.password:
        return {"message": "Customer logged in successfully"}
    raise HTTPException(status_code=400, detail="Invalid credentials")


@router.post("/set/address")
async def set_address(address: Address):
    result = await addresses_collection.insert_one(address.model_dump())
    return {
        "message": "Address set successfully",
        "id": str(result.inserted_id)
    }


@router.post("/dashboard")
async def customer_dashboard(dashboard: CustomerDashboard):
    customer = await customers_collection.find_one(
        {"customer_id": dashboard.customer_id}
    )
    if customer:
        return {"message": "Customer dashboard data", "data": customer}
    raise HTTPException(status_code=404, detail="Customer not found")
