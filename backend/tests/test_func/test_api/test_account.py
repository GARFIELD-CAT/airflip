from http import HTTPStatus

import pytest


@pytest.mark.parametrize(
    "query_data, expected_status, expected_result",
    [
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.CREATED,
            {
                "bonus_amount": 100.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            {
                "wallet_key": "testwalletkey1111",
                "bonus_amount": -1,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": -1,
                        "loc": ["body", "bonus_amount"],
                        "msg": "Value error, Сумма бонусов у пользователя должно быть "  # noqa: 501
                        "больше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "wallet_key": "русскиебуквы",
                "bonus_amount": 100,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "русскиебуквы",
                        "loc": ["body", "wallet_key"],
                        "msg": "Value error, Ключ кошелька должен содержать только "  # noqa: 501
                        "латинские символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "wallet_key": "",
                "bonus_amount": 200,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "",
                        "loc": ["body", "wallet_key"],
                        "msg": "Value error, Ключ кошелька должен содержать только "  # noqa: 501
                        "латинские символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "wallet_key": "test_wallet_key",
                "bonus_amount": 200,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "test_wallet_key",
                        "loc": ["body", "wallet_key"],
                        "msg": "Value error, Ключ кошелька должен содержать только "  # noqa: 501
                        "латинские символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
            },
            HTTPStatus.CREATED,
            {
                "bonus_amount": 0.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
    ],
    ids=[
        "succeed create account without bonus_level",
        "failed create account: bonus_amount less 0",
        "failed create account: wallet_key has Cyrillic characters",
        "failed create account: wallet_key is empty string",
        "failed create account: wallet_key has special characters",
        "succeed create account: bonus_amount is None",
    ],
)
@pytest.mark.asyncio()
async def test_create_account(
    app_client, setup_database, query_data, expected_status, expected_result
):
    response = app_client.post(
        "/api/v1/accounts/create/",
        json=query_data,
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, bonus_level_data, expected_status, expected_result",
    [
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
                "bonus_level": 1,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.CREATED,
            {
                "bonus_amount": 100.0,
                "bonus_level": 1,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
                "bonus_level": 2,
            },
            {
                "name": "Тестовый бонус сто",
                "amount_required": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {"detail": "BonusLevel c bonus_level_id=2 не найден."},
        ),
    ],
    ids=[
        "succeed create account with bonus_level",
        "failed create account with bonus_level: bonus level not found",
    ],
)
@pytest.mark.asyncio()
async def test_create_account_with_bonus_level(
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

    response = app_client.post(
        "/api/v1/accounts/create/",
        json=query_data,
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, account_data, expected_status, expected_result",
    [
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {"detail": "Account с wallet_key='TESTwalletkey1111' уже создан."},
        ),
        (
            {
                "wallet_key": "testwalletkey1111",
                "bonus_amount": 100,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.CREATED,
            {
                "bonus_amount": 100.0,
                "bonus_level": None,
                "id": 2,
                "wallet_key": "testwalletkey1111",
            },
        ),
    ],
    ids=[
        "failed create account: wallet_key already exists",
        "succeed create account: wallet_key has different registry",
    ],
)
@pytest.mark.asyncio()
async def test_create_bonus_level_with_exists_account(
    app_client,
    setup_database,
    query_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    response = app_client.post(
        "/api/v1/accounts/create/",
        json=query_data,
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, account_data, expected_status, expected_result",
    [
        (
            1,
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 100.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            2,
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Account c id=2 не найден."},
        ),
    ],
    ids=[
        "succeed get account by id",
        "failed get account by id: account not found",
    ],
)
@pytest.mark.asyncio()
async def test_get_account_by_id(
    app_client,
    setup_database,
    query_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    response = app_client.get(
        f"/api/v1/accounts/get_by_id/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, account_data, expected_status, expected_result",
    [
        (
            "TESTwalletkey1111",
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 100.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            "TESTwalletkey2222",
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Account c wallet_key='TESTwalletkey2222' не найден."},
        ),
    ],
    ids=[
        "succeed get account by wallet_key",
        "failed get account by wallet_key: account not found",
    ],
)
@pytest.mark.asyncio()
async def test_get_account_by_wallet_key(
    app_client,
    setup_database,
    query_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    response = app_client.get(
        f"/api/v1/accounts/get_by_wallet_key/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, account_data, expected_status, expected_result",
    [
        (
            1,
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NO_CONTENT,
            {},
        ),
        (
            2,
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Account c id=2 не найден."},
        ),
    ],
    ids=[
        "succeed delete account",
        "failed delete account: account not found",
    ],
)
@pytest.mark.asyncio()
async def test_delete_account(
    app_client,
    setup_database,
    query_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    response = app_client.delete(
        f"/api/v1/accounts/delete/{query_data}",
    )

    if expected_result:
        result = response.json()
        assert result == expected_result

    assert response.status_code == expected_status


@pytest.mark.parametrize(
    "query_id, query_data, account_data, expected_status, expected_result",
    [
        (
            1,
            {
                "wallet_key": "NEWwalletkey1111",
                "bonus_amount": 200,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 200.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "NEWwalletkey1111",
            },
        ),
        (
            1,
            {
                "wallet_key": "NEWwalletkey1111",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 100.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "NEWwalletkey1111",
            },
        ),
        (
            1,
            {
                "bonus_amount": 200,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 200,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 200.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            2,
            {
                "wallet_key": "NEWwalletkey1111",
                "bonus_amount": 200,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Account c account_id=2 не найден."},
        ),
        (
            1,
            {
                "wallet_key": "NEWwalletkey1111",
                "bonus_amount": -6,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": -6,
                        "loc": ["body", "bonus_amount"],
                        "msg": "Value error, Сумма бонусов у пользователя должно быть "  # noqa: 501
                        "больше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            2,
            {
                "wallet_key": "НовыйВаллетКей",
                "bonus_amount": 200,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": "НовыйВаллетКей",
                        "loc": ["body", "wallet_key"],
                        "msg": "Value error, Ключ кошелька должен содержать только "  # noqa: 501
                        "латинские символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
    ],
    ids=[
        "succeed full update account",
        "succeed update wallet_key for account",
        "succeed update bonus_amount for account",
        "failed update account: account not found",
        "failed update account: bonus_amount less 0",
        "failed update account: wallet_key has Cyrillic characters",
    ],
)
@pytest.mark.asyncio()
async def test_update_account(
    app_client,
    setup_database,
    query_id,
    query_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    response = app_client.patch(
        f"/api/v1/accounts/update/{query_id}",
        json=query_data,
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "accounts_data, expected_status, expected_result",
    [
        (
            [
                {
                    "wallet_key": "TESTwalletkey1111",
                    "bonus_amount": 100,
                },
                {
                    "wallet_key": "TESTwalletkey2222",
                    "bonus_amount": 200,
                },
            ],
            HTTPStatus.OK,
            [
                {
                    "bonus_amount": 100.0,
                    "bonus_level": None,
                    "id": 1,
                    "wallet_key": "TESTwalletkey1111",
                },
                {
                    "bonus_amount": 200.0,
                    "bonus_level": None,
                    "id": 2,
                    "wallet_key": "TESTwalletkey2222",
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
        "succeed get accounts with 2 accounts",
        "succeed get accounts with 0 accounts",
    ],
)
@pytest.mark.asyncio()
async def test_get_accounts(
    app_client,
    setup_database,
    accounts_data,
    expected_status,
    expected_result,
):
    for account in accounts_data:
        app_client.post(
            "/api/v1/accounts/create/",
            json=account,
        )

    response = app_client.get(
        "/api/v1/accounts/get_accounts/",
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


"""
    hash: str = Field(description="Hash транзакции")
    token_from: str = Field(description="Отправитель транзакции")
    token_to: str = Field(description="Получатель транзакции")
    amount_from: int = Field(description="Сумма отправления")
    amount_to: int = Field(description="Сумма получения")
    chain_from: int = Field(description="Сеть оптравления")
    chain_to: int = Field(description="Сеть получения")
    transaction_date: Optional[datetime] = Field(
        description="Дата транзакции", default=datetime.now(dt.UTC)
    )
    account: int = Field(description="Кошелек транзакции")

"""


@pytest.mark.parametrize(
    "query_keys, account_data, transactions_data, expected_status, expected_result",  # noqa: 501
    [
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "sort_desc": "true",
                "skip": 0,
                "limit": 25,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [
                {
                    "hash": "testTransaction1",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "transaction_date": "2025-04-08T04:10:53",
                    "account": 1,
                },
                {
                    "hash": "testTransaction2",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "transaction_date": "2025-04-08T04:11:53",
                    "account": 1,
                },
            ],
            HTTPStatus.OK,
            [
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "hash": "testTransaction2",
                    "id": 2,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:11:53",
                },
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "hash": "testTransaction1",
                    "id": 1,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
                },
            ],
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "sort_desc": "true",
                "skip": 0,
                "limit": 25,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [],
            HTTPStatus.OK,
            [],
        ),
        (
            {
                "wallet_key": "TESTwalletkey2222",
                "sort_desc": "true",
                "skip": 0,
                "limit": 25,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [],
            HTTPStatus.NOT_FOUND,
            {"detail": "Account c wallet_key='TESTwalletkey2222' не найден."},
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "sort_desc": "false",
                "skip": 0,
                "limit": 25,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [
                {
                    "hash": "testTransaction1",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "transaction_date": "2025-04-08T04:10:53",
                    "account": 1,
                },
                {
                    "hash": "testTransaction2",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "transaction_date": "2025-04-08T04:11:53",
                    "account": 1,
                },
            ],
            HTTPStatus.OK,
            [
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "hash": "testTransaction1",
                    "id": 1,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
                },
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "hash": "testTransaction2",
                    "id": 2,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:11:53",
                },
            ],
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "sort_desc": "false",
                "skip": 1,
                "limit": 25,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [
                {
                    "hash": "testTransaction1",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "transaction_date": "2025-04-08T04:10:53",
                    "account": 1,
                },
                {
                    "hash": "testTransaction2",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "transaction_date": "2025-04-08T04:11:53",
                    "account": 1,
                },
            ],
            HTTPStatus.OK,
            [
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "hash": "testTransaction2",
                    "id": 2,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:11:53",
                }
            ],
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "sort_desc": "false",
                "skip": 0,
                "limit": 1,
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [
                {
                    "hash": "testTransaction1",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "transaction_date": "2025-04-08T04:10:53",
                    "account": 1,
                },
                {
                    "hash": "testTransaction2",
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "amount_from": 10,
                    "amount_to": 3,
                    "chain_from": 2000,
                    "chain_to": 3000,
                    "transaction_date": "2025-04-08T04:11:53",
                    "account": 1,
                },
            ],
            HTTPStatus.OK,
            [
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "hash": "testTransaction1",
                    "id": 1,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
                }
            ],
        ),
    ],
    ids=[
        "succeed get transactions by account wallet_key",
        "succeed get transactions with 0 transactions",
        "failed get transactions by account wallet_key: account not found",
        "succeed get transactions by account wallet_key with asc sort",
        "succeed get transactions by account wallet_key with skip 1",
        "succeed get transactions by account wallet_key with limit 1",
    ],
)
@pytest.mark.asyncio()
async def test_get_transactions_by_wallet_key(
    app_client,
    setup_database,
    query_keys,
    account_data,
    transactions_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    for transaction in transactions_data:
        app_client.post(
            "/api/v1/transactions/create/",
            json=transaction,
        )

    wallet_key = query_keys["wallet_key"]
    sort_desc = query_keys["sort_desc"]
    skip = query_keys["skip"]
    limit = query_keys["limit"]
    response = app_client.get(
        f"/api/v1/accounts/get_transactions_by_wallet_key/?wallet_key={wallet_key}&sort_desc={sort_desc}&skip={skip}&limit={limit}",  # noqa: 501
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result
