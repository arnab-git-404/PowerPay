from fastapi import APIRouter
from .customer import router as customer_router
from .company import router as company_router
from .branch import router as branch_router

api_router = APIRouter()

api_router.include_router(
    customer_router,
    prefix="/customer",
    tags=["Customer"]
)
api_router.include_router(
    branch_router,
    prefix="/branch",
    tags=["Branch"]
)
api_router.include_router(
    company_router,
    prefix="/company",
    tags=["Company"]
)
