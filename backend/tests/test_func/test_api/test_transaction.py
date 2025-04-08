from http import HTTPStatus

import pytest


@pytest.mark.parametrize(
    "query_data, account_data, expected_status, expected_result",
    [
        (
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
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.CREATED,
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
        ),
        (
            {
                "account": 1,
                "amount_from": -10,
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
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.UNPROCESSABLE_ENTITY,
            {
                "detail": [
                    {
                        "ctx": {"error": {}},
                        "input": -10,
                        "loc": ["body", "amount_from"],
                        "msg": "Value error, Поле должно быть не меньше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": -1,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": -1,
                        "loc": ["body", "amount_to"],
                        "msg": "Value error, Поле должно быть не меньше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": -10,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": -10,
                        "loc": ["body", "chain_from"],
                        "msg": "Value error, Поле должно быть не меньше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": -10,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": -10,
                        "loc": ["body", "chain_to"],
                        "msg": "Value error, Поле должно быть не меньше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "ТестоваяТранзакиция",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": "ТестоваяТранзакиция",
                        "loc": ["body", "hash"],
                        "msg": "Value error, Поле должно содержать только латинские "  # noqa: 501
                        "символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": "",
                        "loc": ["body", "hash"],
                        "msg": "Value error, Поле должно содержать только латинские "  # noqa: 501
                        "символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "test Transa_ction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": "test Transa_ction1",
                        "loc": ["body", "hash"],
                        "msg": "Value error, Поле должно содержать только латинские "  # noqa: 501
                        "символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "token_From1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": "token_From1",
                        "loc": ["body", "token_from"],
                        "msg": "Value error, Поле должно содержать только латинские "  # noqa: 501
                        "символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "token_To1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": "token_To1",
                        "loc": ["body", "token_to"],
                        "msg": "Value error, Поле должно содержать только латинские "  # noqa: 501
                        "символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 0,
                "amount_to": 10,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": {
                            "account": 1,
                            "amount_from": 0,
                            "amount_to": 10,
                            "chain_from": 1000,
                            "chain_to": 2000,
                            "hash": "testTransaction1",
                            "id": 1,
                            "token_from": "tokenFrom1",
                            "token_to": "tokenTo1",
                            "transaction_date": "2025-04-08T04:10:53",
                        },
                        "loc": ["body"],
                        "msg": "Value error, Сумма отправления не может быть меньше суммы "  # noqa: 501
                        "получения",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 5,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenFrom1",
                "transaction_date": "2025-04-08T04:10:53",
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
                        "input": {
                            "account": 1,
                            "amount_from": 10,
                            "amount_to": 5,
                            "chain_from": 1000,
                            "chain_to": 2000,
                            "hash": "testTransaction1",
                            "id": 1,
                            "token_from": "tokenFrom1",
                            "token_to": "tokenFrom1",
                            "transaction_date": "2025-04-08T04:10:53",
                        },
                        "loc": ["body"],
                        "msg": "Value error, Отправитель транзакции не может быть "  # noqa: 501
                        "получателем транзакции",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            {
                "account": 2,
                "amount_from": 10,
                "amount_to": 5,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {"detail": "Аccount c account_id=2 не найден."},
        ),
    ],
    ids=[
        "succeed create transaction",
        "failed create transaction: amount_from less 0",
        "failed create transaction: amount_to less 0",
        "failed create transaction: chain_from less 0",
        "failed create transaction: chain_to less 0",
        "failed create transaction: hash has Cyrillic characters",
        "failed create transaction: hash is empty string",
        "failed create transaction: hash has special characters",
        "failed create transaction: token_from has special characters",
        "failed create transaction: token_to has special characters",
        "failed create transaction: amount_from less amount_to",
        "failed create transaction: token_from is equal token_to",
        "failed create transaction: account not found",
    ],
)
@pytest.mark.asyncio()
async def test_create_transaction(
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
        "/api/v1/transactions/create/",
        json=query_data,
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, transaction_data, account_data, expected_status, expected_result",  # noqa: 501
    [
        (
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
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {"detail": "Transaction с hash='testTransaction1' уже создана."},
        ),
        (
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testtransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "TESTTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.CREATED,
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testtransaction1",
                "id": 2,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
        ),
    ],
    ids=[
        "failed create transaction: hash already exists",
        "succeed create transaction: hash has different registry",
    ],
)
@pytest.mark.asyncio()
async def test_create_transaction_with_exists_account(
    app_client,
    setup_database,
    query_data,
    transaction_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    response = app_client.post(
        "/api/v1/transactions/create/",
        json=query_data,
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, transaction_data, account_data, expected_status, expected_result",  # noqa: 501
    [
        (
            1,
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
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
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
                "transaction_date": "2025-04-08T01:10:53Z",
            },
        ),
        (
            2,
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testtransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Transation c id=2 не найден."},
        ),
    ],
    ids=[
        "succeed get transaction by id",
        "failed get transaction by id: transaction not found",
    ],
)
@pytest.mark.asyncio()
async def test_get_transaction_by_id(
    app_client,
    setup_database,
    query_data,
    transaction_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    response = app_client.get(
        f"/api/v1/transactions/get_by_id/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, transaction_data, account_data, expected_status, expected_result",  # noqa: 501
    [
        (
            "testTransaction1",
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
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
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
                "transaction_date": "2025-04-08T01:10:53Z",
            },
        ),
        (
            "TESTtransaction2",
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testtransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Transaction c hash='TESTtransaction2' не найден."},
        ),
    ],
    ids=[
        "succeed get transaction by hash",
        "failed get transaction by hash: transaction not found",
    ],
)
@pytest.mark.asyncio()
async def test_get_transaction_by_hash(
    app_client,
    setup_database,
    query_data,
    transaction_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    response = app_client.get(
        f"/api/v1/transactions/get_by_hash/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, transaction_data, account_data, expected_status, expected_result",  # noqa: 501
    [
        (
            1,
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
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NO_CONTENT,
            {},
        ),
        (
            2,
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testtransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Transaction c id=2 не найден."},
        ),
    ],
    ids=[
        "succeed delete transaction",
        "failed delete transaction: transaction not found",
    ],
)
@pytest.mark.asyncio()
async def test_delete_transaction(
    app_client,
    setup_database,
    query_data,
    transaction_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    response = app_client.delete(
        f"/api/v1/transactions/delete/{query_data}",
    )

    if expected_result:
        result = response.json()
        assert result == expected_result

    assert response.status_code == expected_status


@pytest.mark.parametrize(
    "query_id, query_data, transaction_data, account_data, expected_status, expected_result",  # noqa: 501
    [
        (
            1,
            {
                "account": 1,
                "amount_from": 20,
                "amount_to": 10,
                "chain_from": 1111,
                "chain_to": 2222,
                "hash": "NewtestTransaction1",
                "token_from": "NewtokenFrom1",
                "token_to": "NewtokenTo1",
                "transaction_date": "2025-04-08T10:10:53",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "account": 1,
                "amount_from": 20,
                "amount_to": 10,
                "chain_from": 1111,
                "chain_to": 2222,
                "hash": "NewtestTransaction1",
                "id": 1,
                "token_from": "NewtokenFrom1",
                "token_to": "NewtokenTo1",
                "transaction_date": "2025-04-08T10:10:53",
            },
        ),
        (
            1,
            {
                "amount_from": 200,
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "account": 1,
                "amount_from": 200,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
        ),
        (
            1,
            {
                "amount_to": 200,
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {
                "detail": "Сумма отправления не может быть меньше суммы получения"  # noqa: 501
            },
        ),
        (
            1,
            {
                "token_from": "tokenTo1",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction3",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {
                "detail": "Отправитель транзакции не может быть получателем транзакции"  # noqa: 501
            },
        ),
        (
            1,
            {
                "token_to": "tokenFrom1",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction4",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.BAD_REQUEST,
            {
                "detail": "Отправитель транзакции не может быть получателем транзакции"  # noqa: 501
            },
        ),
        (
            1,
            {
                "transaction_date": "2025-04-08",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction4",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-09",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.OK,
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction4",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T00:00:00",
            },
        ),
        (
            1,
            {
                "hash": "НоваяТранзация",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction4",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-09",
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
                        "input": "НоваяТранзация",
                        "loc": ["body", "hash"],
                        "msg": "Value error, Поле должно содержать только латинские "  # noqa: 501
                        "символы/цифры",
                        "type": "value_error",
                    }
                ]
            },
        ),
        (
            2,
            {
                "hash": "testTransaction5",
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction4",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-09",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            HTTPStatus.NOT_FOUND,
            {"detail": "Transaction c transaction_id=2 не найден."},
        ),
        (
            1,
            {
                "amount_from": -10,
            },
            {
                "account": 1,
                "amount_from": 10,
                "amount_to": 2,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction4",
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-09",
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
                        "input": -10,
                        "loc": ["body", "amount_from"],
                        "msg": "Value error, Поле должно быть не меньше 0",
                        "type": "value_error",
                    }
                ]
            },
        ),
    ],
    ids=[
        "succeed full update transaction",
        "succeed update amount_from for transaction",
        "failed update transaction: amount_to more than amount_from",
        "failed update transaction: token_from equal token_to",
        "failed update transaction: token_to equal token_from",
        "succeed update transaction: transaction_date has not full format",
        "failed update transaction: hash has Cyrillic characters",
        "failed update transaction: transaction not found",
        "failed update account: amount_from less 0",
    ],
)
@pytest.mark.asyncio()
async def test_update_transaction(
    app_client,
    setup_database,
    query_id,
    query_data,
    transaction_data,
    account_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    response = app_client.patch(
        f"/api/v1/transactions/update/{query_id}",
        json=query_data,
    )

    result = response.json()
    assert result == expected_result

    assert response.status_code == expected_status


@pytest.mark.parametrize(
    "query_data, transaction_data, update_transaction_data, account_data, bonus_level_data, expected_status, expected_result",  # noqa: 501
    [
        (
            1,
            {
                "account": 1,
                "amount_from": 2000,
                "amount_to": 100,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {"amount_to": 2000},
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            {
                "name": "Тестовый бонус три",
                "amount_required": 300,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 160.0,
                "bonus_level": None,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            1,
            {
                "account": 1,
                "amount_from": 20000,
                "amount_to": 100,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {"amount_to": 10000},
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            {
                "name": "Тестовый бонус три",
                "amount_required": 300,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 400.0,
                "bonus_level": 1,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            1,
            {
                "account": 1,
                "amount_from": 20000,
                "amount_to": 100,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {"amount_to": 10000},
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            {
                "name": "Тестовый бонус четыре",
                "amount_required": 400,
            },
            HTTPStatus.OK,
            {
                "bonus_amount": 400.0,
                "bonus_level": 1,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
    ],
    ids=[
        "succeed update bonus_amount for account",
        "succeed update bonus_level for account: bonus_amount exceeds than amount_required",  # noqa: 501
        "succeed update bonus_level for account: bonus_amount is equal amount_required",  # noqa: 501
    ],
)
@pytest.mark.asyncio()
async def test_update_transaction_with_update_account_bonus_amount(
    app_client,
    setup_database,
    query_data,
    transaction_data,
    update_transaction_data,
    account_data,
    bonus_level_data,
    expected_status,
    expected_result,
):
    app_client.post(
        "/api/v1/bonus_levels/create/",
        json=bonus_level_data,
    )

    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    app_client.patch(
        f"/api/v1/transactions/update/{query_data}",
        json=update_transaction_data,
    )

    response = app_client.get(
        f"/api/v1/accounts/get_by_id/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "account_data, transactions_data, expected_status, expected_result",
    [
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "hash": "testtransaction1",
                    "id": 1,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
                },
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "hash": "testtransaction2",
                    "id": 1,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
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
                    "hash": "testtransaction1",
                    "id": 1,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
                },
                {
                    "account": 1,
                    "amount_from": 10,
                    "amount_to": 2,
                    "chain_from": 1000,
                    "chain_to": 2000,
                    "hash": "testtransaction2",
                    "id": 2,
                    "token_from": "tokenFrom1",
                    "token_to": "tokenTo1",
                    "transaction_date": "2025-04-08T04:10:53",
                },
            ],
        ),
        (
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
            },
            [],
            HTTPStatus.OK,
            [],
        ),
    ],
    ids=[
        "succeed get transactions with 2 transaction",
        "succeed get transactions with 0 transaction",
    ],
)
@pytest.mark.asyncio()
async def test_get_transactions(
    app_client,
    setup_database,
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

    response = app_client.get(
        "/api/v1/transactions/get_transactions/",
    )

    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, transaction_data, account_data, bonus_levels_data, expected_status, expected_result",  # noqa: 501
    [
        (
            1,
            {
                "account": 1,
                "amount_from": 1000,
                "amount_to": 1000,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
                "bonus_level": 1,
            },
            [
                {
                    "name": "Тестовый бонус сто",
                    "amount_required": 300,
                },
            ],
            HTTPStatus.OK,
            {
                "bonus_amount": 130.0,
                "bonus_level": 1,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            1,
            {
                "account": 1,
                "amount_from": 20000,
                "amount_to": 10000,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
                "bonus_level": 1,
            },
            [
                {
                    "name": "Тестовый бонус сто",
                    "amount_required": 100,
                },
                {
                    "name": "Тестовый бонус триста",
                    "amount_required": 300,
                },
            ],
            HTTPStatus.OK,
            {
                "bonus_amount": 400.0,
                "bonus_level": 2,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
        (
            1,
            {
                "account": 1,
                "amount_from": 20000,
                "amount_to": 10000,
                "chain_from": 1000,
                "chain_to": 2000,
                "hash": "testTransaction1",
                "id": 1,
                "token_from": "tokenFrom1",
                "token_to": "tokenTo1",
                "transaction_date": "2025-04-08T04:10:53",
            },
            {
                "wallet_key": "TESTwalletkey1111",
                "bonus_amount": 100,
                "bonus_level": 1,
            },
            [
                {
                    "name": "Тестовый бонус сто",
                    "amount_required": 100,
                },
                {
                    "name": "Тестовый бонус четыреста",
                    "amount_required": 400,
                },
            ],
            HTTPStatus.OK,
            {
                "bonus_amount": 400.0,
                "bonus_level": 2,
                "id": 1,
                "wallet_key": "TESTwalletkey1111",
            },
        ),
    ],
    ids=[
        "succeed update bonus_amount for account",
        "succeed update bonus_level for account: bonus_amount exceeds than amount_required",  # noqa: 501
        "succeed update bonus_level for account: bonus_amount is equal amount_required",  # noqa: 501
    ],
)
@pytest.mark.asyncio()
async def test_calculate_bonus_amount_for_transaction(
    app_client,
    setup_database,
    query_data,
    transaction_data,
    account_data,
    bonus_levels_data,
    expected_status,
    expected_result,
):
    for bonus_level in bonus_levels_data:
        app_client.post(
            "/api/v1/bonus_levels/create/",
            json=bonus_level,
        )

    app_client.post(
        "/api/v1/accounts/create/",
        json=account_data,
    )

    app_client.post(
        "/api/v1/transactions/create/",
        json=transaction_data,
    )

    response = app_client.get(
        f"/api/v1/accounts/get_by_id/{query_data}",
    )
    result = response.json()

    assert response.status_code == expected_status
    assert result == expected_result
