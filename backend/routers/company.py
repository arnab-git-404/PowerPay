from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from schemas.schemas import CompanyLogin

router = APIRouter()
client = AsyncIOMotorClient("MONGODB_URL")
database = client.your_database_name
branches_collection = database.get_collection("branches")


@router.post("/login")
async def company_login(company: CompanyLogin):
    user = await branches_collection.find_one(
        {"email": company.email,
         "type": company.type}
    )
    if user and user["password"] == company.password:
        return {"message": "Company logged in successfully"}
    raise HTTPException(status_code=400, detail="Invalid credentials")
