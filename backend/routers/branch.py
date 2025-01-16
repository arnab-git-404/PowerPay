from fastapi import APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from schemas.schemas import BranchDashboard, DeleteAccount

router = APIRouter()
client = AsyncIOMotorClient("MONGODB_URL")
database = client.your_database_name
branches_collection = database.get_collection("branches")
customers_collection = database.get_collection("customers")


@router.post("/dashboard")
async def branch_dashboard(dashboard: BranchDashboard):
    branch = await branches_collection.find_one(
        {"branch_code": dashboard.branch_code}
    )
    if branch:
        return {"message": "Branch dashboard data", "data": branch}
    raise HTTPException(status_code=404, detail="Branch not found")


@router.post("/delete/account")
async def delete_account(account: DeleteAccount):
    result = await customers_collection.delete_one(
        {"account_no": account.account_no}
    )
    if result.deleted_count == 1:
        return {"message": "Account deleted successfully"}
    raise HTTPException(status_code=404, detail="Account not found")
