from http import HTTPStatus

import pytest


@pytest.mark.parametrize(
    "query_data, expected_status, expected_result",
    [
        (
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.CREATED,
            {"id": 1, "name": "Тестовый бонус сто", "amount_required": 100},
        ),
        (
            {
                "name": "Тестовый бонус 200",
                "amount_required": 200,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "Тестовый бонус 200",
                        "loc": ["body", "name"],
                        "msg": "Value error, Название бонуса должно начинаться с большой "  # noqa: 501
                        "буквы и содержать только кирилицу/пробелы",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "name": "Test bonus",
                "amount_required": 200,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "Test bonus",
                        "loc": ["body", "name"],
                        "msg": "Value error, Название бонуса должно начинаться с большой "  # noqa: 501
                        "буквы и содержать только кирилицу/пробелы",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "name": "",
                "amount_required": 200,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "",
                        "loc": ["body", "name"],
                        "msg": "Value error, Название бонуса должно начинаться с большой "  # noqa: 501
                        "буквы и содержать только кирилицу/пробелы",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "name": "Бонус_левел_двести",
                "amount_required": 200,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "Бонус_левел_двести",
                        "loc": ["body", "name"],
                        "msg": "Value error, Название бонуса должно начинаться с большой "  # noqa: 501
                        "буквы и содержать только кирилицу/пробелы",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "name": "Тестовый бонус три",
            },
            HTTPStatus.CREATED,
            {"amount_required": 0, "id": 1, "name": "Тестовый бонус три"},
        ),
    ],
    ids=[
        "succeed create bonus_level",
        "failed create bonus_level: name has numbers",
        "failed create bonus_level: name has English characters",
        "failed create bonus_level: name is empty string",
        "failed create bonus_level: name has special characters",
        "succeed create bonus_level: amount_required is None",
    ],
)
@pytest.mark.asyncio()
async def test_create_bonus_level(
    app_client, setup_database, query_data, expected_status, expected_result
):
    response = app_client.post(
        "/api/v1/bonus_levels/create/",
        json=query_data,
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, expected_status, expected_result",
    [
        (
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {"detail": "BonusLevel с name='Тестовый бонус сто' уже создан."},
        ),
    ],
    ids=[
        "failed create bonus_level: name already exists",
    ],
)
@pytest.mark.asyncio()
async def test_create_bonus_level_with_exists_name(
    app_client, setup_database, query_data, expected_status, expected_result
):
    app_client.post(
        "/api/v1/bonus_levels/create/",
        json=query_data,
    )

    response = app_client.post(
        "/api/v1/bonus_levels/create/",
        json=query_data,
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, bonus_level_data, expected_status, expected_result",
    [
        (
            1,
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.OK,
            {"id": 1, "name": "Тестовый бонус сто", "amount_required": 100},
        ),
        (
            2,
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "BonusLevel c id=2 не найден."},
        ),
    ],
    ids=[
        "succeed get bonus_level",
        "failed get bonus_level: bonus_level not found",
    ],
)
@pytest.mark.asyncio()
async def test_get_bonus_level(
    app_client,
    setup_database,
    query_data,
    bonus_level_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/bonus_levels/create/",
        json=bonus_level_data,
    )

    response = app_client.get(
        f"/api/v1/bonus_levels/get/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, bonus_level_data, expected_status, expected_result",
    [
        (
            1,
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.NO_CONTENT,
            {},
        ),
        (
            2,
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "BonusLevel c bonus_level_id=2 не найден."},
        ),
    ],
    ids=[
        "succeed delete bonus_level",
        "failed delete bonus_level: bonus_level not found",
    ],
)
@pytest.mark.asyncio()
async def test_delete_bonus_level(
    app_client,
    setup_database,
    query_data,
    bonus_level_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/bonus_levels/create/",
        json=bonus_level_data,
    )

    response = app_client.delete(
        f"/api/v1/bonus_levels/delete/{query_data}",
    )

    if expected_result:
        result = response.json()
        assert result == expected_result

    assert response.status_code == expected_status


@pytest.mark.parametrize(
    "query_id, query_data, bonus_level_data, expected_status, expected_result",
    [
        (
            1,
            {
                "name": "Обновленный бонус",
                "amount_required": 200,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.OK,
            {"amount_required": 200, "id": 1, "name": "Обновленный бонус"},
        ),
        (
            1,
            {
                "name": "Обновленный бонус",
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.OK,
            {"amount_required": 100, "id": 1, "name": "Обновленный бонус"},
        ),
        (
            1,
            {
                "amount_required": 200,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.OK,
            {"amount_required": 200, "id": 1, "name": "Тестовый бонус сто"},
        ),
        (
            2,
            {
                "name": "Обновленный бонус",
                "amount_required": 200,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "BonusLevel c bonus_level_id=2 не найден."},
        ),
        (
            1,
            {
                "name": "Обновленный бонус",
                "amount_required": -6,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": -6,
                        "loc": ["body", "amount_required"],
                        "msg": "Value error, Сумма необходимая для получения бонуса "  # noqa: 501
                        "должна быть больше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            2,
            {
                "name": "Updated bonus",
                "amount_required": 200,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "Updated bonus",
                        "loc": ["body", "name"],
                        "msg": "Value error, Название бонуса должно начинаться с большой "  # noqa: 501
                        "буквы и содержать только кирилицу/пробелы",
                        "type": "value_error",
                    }
                ]
            },
        ),
    ],
    ids=[
        "succeed full update bonus_level",
        "succeed update name for bonus_level",
        "succeed update amount_required for bonus_level",
        "failed update bonus_level: bonus_level not found",
        "failed update bonus_level: amount_required less 0",
        "failed update bonus_level: name has English characters",
    ],
)
@pytest.mark.asyncio()
async def test_update_bonus_level(
    app_client,
    setup_database,
    query_id,
    query_data,
    bonus_level_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/bonus_levels/create/",
        json=bonus_level_data,
    )

    response = app_client.patch(
        f"/api/v1/bonus_levels/update/{query_id}",
        json=query_data,
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "bonus_levels_data, expected_status, expected_result",
    [
        (
            [
                {
                    "name": "Тестовый бонус сто",
                    "amount_required": 100,
                },
                {
                    "name": "Тестовый бонус двести",
                    "amount_required": 200,
                },
            ],
            HTTPStatus.OK,
            [
                {
                    "amount_required": 100,
                    "id": 1,
                    "name": "Тестовый бонус сто",
                },
                {
                    "amount_required": 200,
                    "id": 2,
                    "name": "Тестовый бонус двести",
                },
            ],
        ),
        (
            [],
            HTTPStatus.OK,
            [],
        ),
    ],
    ids=[
        "succeed get bonus_levels with 2 bonus",
        "succeed get bonus_levels with 0 bonus",
    ],
)
@pytest.mark.asyncio()
async def test_get_bonus_levels(
    app_client,
    setup_database,
    bonus_levels_data,
    expected_status,
    expected_result,
):
    for bonus_level in bonus_levels_data:
        app_client.post(
            "/api/v1/bonus_levels/create/",
            json=bonus_level,
        )

    response = app_client.get(
        "/api/v1/bonus_levels/get_bonus_levels/",
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result
