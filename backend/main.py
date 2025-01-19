from fastapi import FastAPI
from routers import api_router

app = FastAPI()
app.include_router(api_router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Welcome to the API!"}
