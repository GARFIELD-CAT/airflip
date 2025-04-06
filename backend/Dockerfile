FROM python:3.12

RUN mkdir /backend
WORKDIR /backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH="/backend"

RUN apt-get update && apt-get install -y curl
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"

COPY ./pyproject.toml ./poetry.lock .

RUN poetry install --no-root --without dev

COPY . .

ENTRYPOINT ["poetry", "run", "python", "main.py"]
