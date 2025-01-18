from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services import CustomerHandler, BranchHandler
from schemas import BranchDashboard, DeleteAccount

router = APIRouter()

branchObj = BranchHandler()
customerObj = CustomerHandler()


@router.post("/dashboard")
async def branch_dashboard(dashboard: BranchDashboard):
    branch = branchObj.branchData(dashboard.branchCode)
    if branch:
        return JSONResponse(
            status_code=200,
            content={"message": "Branch dashboard data", "data": branch}
        )
    raise HTTPException(status_code=404, detail="Branch not found")


@router.post("/delete_account")
async def delete_account(account: DeleteAccount):
    result = customerObj.deleteAccount(account.accountNumber)
    if result:
        return JSONResponse(
            status_code=200,
            content={"message": "Account deleted successfully"}
        )
    raise HTTPException(status_code=404, detail="Account not found")
