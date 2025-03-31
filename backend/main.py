import asyncio

import uvicorn
from fastapi import FastAPI

from homework_7.api.v1.auth import auth_router
from homework_7.api.v1.backend import backend_router
from homework_7.api.v1.course import course_router
from homework_7.api.v1.faculty import faculty_router
from homework_7.api.v1.student import student_router
from homework_7.api.v1.user import user_router
from homework_7.services.main_service import main_service

app = FastAPI(title="my_api")

app.include_router(student_router, prefix="/api/v1/students")
app.include_router(course_router, prefix="/api/v1/courses")


if __name__ == "__main__":
    # asyncio.run(main_service.drop_db())
    asyncio.run(main_service.init_db())

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
