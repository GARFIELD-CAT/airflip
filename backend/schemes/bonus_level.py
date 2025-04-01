import re

from pydantic import BaseModel, Field, field_validator


class RequestBonusLevel(BaseModel):
    name: str = Field(description="Название бонуса")
    amount_required: int = Field(
        description="Сумма необходимая для получения бонуса", default=0
    )

    @field_validator("name", mode="before")
    def validate_name(cls, value):
        pattern = r"^[А-ЯЁ][а-яё\s]+$"
        if not re.match(pattern, value):
            raise ValueError(
                "Название бонуса должно начинаться с большой буквы "
                "и содержать только кирилицу/пробелы"
            )

        return value

    @field_validator("amount_required", mode="before")
    def validate_amount_required(cls, value):
        if value < 0:
            raise ValueError(
                "Сумма необходимая для получения бонуса должна быть больше 0"
            )

        return value


class ResponseBonusLevel(BaseModel):
    id: int = Field(description="Id бонуса")
    name: str = Field(description="Название бонуса")
    amount_required: int = Field(
        description="Сумма необходимая для получения бонуса"
    )


class UpdateBonusLevel(RequestBonusLevel):
    name: str = None
    amount_required: int = None
