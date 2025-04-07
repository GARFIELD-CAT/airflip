import asyncio

import pytest


@pytest.mark.parametrize(
    "query_data, expected_result",
    [
        (
            {
                "key": "some_key",
                "value": "some_value",
                "expire_time": None,
            },
            "some_value",
        ),
        (
            {
                "key": "some_key",
                "value": "some_value",
                "expire_time": 1,
            },
            None,
        ),
    ],
    ids=[
        "succeed set cache",
        "succeed set cache with expire_time",
    ],
)
@pytest.mark.asyncio()
async def test_set_and_get(cache_storage, query_data, expected_result):
    key = query_data["key"]
    value = query_data["value"]
    expire_time = query_data["expire_time"]

    if expire_time:
        await cache_storage.set(key=key, value=value, expire_time=expire_time)
        await asyncio.sleep(1)
    else:
        await cache_storage.set(key=key, value=value)

    result = await cache_storage.get(key)

    assert result == expected_result


@pytest.mark.parametrize(
    "query_data, expected_result",
    [
        (
            {"key": "some_key_for_delete", "value": "some_value"},
            None,
        ),
        (
            {"key": "some_key_not_delete", "value": "some_value"},
            "some_value",
        ),
    ],
    ids=[
        "succeed delete cache",
        "succeed not delete another cache",
    ],
)
@pytest.mark.asyncio()
async def test_delete(cache_storage, query_data, expected_result):
    key = query_data["key"]
    value = query_data["value"]
    delete_key = "some_key_for_delete"

    await cache_storage.set(key, value=value)
    result = await cache_storage.get(key)

    assert result == value

    await cache_storage.delete(delete_key)
    result = await cache_storage.get(key)

    assert result == expected_result
