from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from schemas import CompanyLogin
from services import CompanyHandler

router = APIRouter()

companyObj = CompanyHandler()


@router.post("/login")
async def company_login(company: CompanyLogin):
    user = companyObj.companyLogin(company.model_dump())

    if user:
        return JSONResponse(
            status_code=200,
            content={
                "message": "Login successful",
                "data": user
            }
        )
    raise HTTPException(status_code=400, detail="Invalid credentials")
