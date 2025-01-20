from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from services import CustomerHandler, BranchHandler
from schemas import BranchDashboard, AccountNumber

router = APIRouter()

branch_handler = BranchHandler()

customer_handler = CustomerHandler()


@router.get("/branch_codes")
async def branch_codes():
    branch_codes = branch_handler.get_branche_codes()
    return JSONResponse(
        status_code=200,
        content={"message": "Branch codes", "data": branch_codes}
    )


@router.post("/dashboard")
async def branch_dashboard(dashboard: BranchDashboard):
    branch = branch_handler.branch_data(dashboard.branch_code)
    if branch:
        return JSONResponse(
            status_code=200,
            content={"message": "Branch dashboard data", "data": branch}
        )
    raise HTTPException(status_code=404, detail="Branch not found")


@router.post("/delete_account")
async def delete_account(account: AccountNumber):
    result = customer_handler.delete_account(account.account_number)
    if result:
        return JSONResponse(
            status_code=200,
            content={"message": "Account deleted successfully"}
        )
    raise HTTPException(status_code=404, detail="Account not found")
