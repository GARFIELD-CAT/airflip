import datetime
from datetime import datetime as dt

from sqlalchemy import (
    BigInteger,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    wallet_key = Column(String(256), index=True, unique=True)
    bonus_amount = Column(Integer)
    bonus_level = Column(
        Integer,
        ForeignKey("bonus_levels.id", ondelete="SET NULL"),
        nullable=True,
    )

    transactions = relationship(
        "Transaction", back_populates="accounts", lazy="subquery"
    )
    bonus_levels = relationship(
        "BonusLevel", back_populates="accounts", lazy="subquery"
    )

    def __repr__(self):
        return (
            f"{self.id} - {self.wallet_key} - "
            f"{self.bonus_amount} - {self.bonus_level}"
        )

    def as_dict(self):
        return {
            "id": self.id,
            "wallet_key": self.wallet_key,
            "bonus_amount": self.bonus_amount,
            "bonus_level": self.bonus_level,
        }


class BonusLevel(Base):
    __tablename__ = "bonus_levels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), unique=True)
    amount_required = Column(Integer)

    accounts = relationship(
        "Account", back_populates="bonus_levels", lazy="subquery"
    )

    def __repr__(self):
        return f"{self.id} - {self.name} - {self.amount_required}"

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "amount_required": self.amount_required,
        }


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    hash = Column(String(256), index=True, unique=True)
    token_from = Column(String(256))
    token_to = Column(String(256))
    amount_from = Column(BigInteger)
    amount_to = Column(BigInteger)
    chain_from = Column(Integer)
    chain_to = Column(Integer)
    transaction_date = Column(DateTime, default=dt.now(datetime.UTC))
    account = Column(
        Integer, ForeignKey("accounts.id", ondelete="CASCADE"), nullable=False
    )

    accounts = relationship(
        "Account", back_populates="transactions", lazy="subquery"
    )  # type: ignore

    def __repr__(self):
        return (
            f"{self.id} - {self.hash} - {self.token_from} - {self.token_to} - "
            f"{self.amount_from} - {self.amount_to} - {self.chain_from} -"
            f" {self.chain_to} - {self.transaction_date} - {self.account}"
        )

    def as_dict(self):
        return {
            "id": self.id,
            "hash": self.hash,
            "token_from": self.token_from,
            "token_to": self.token_to,
            "amount_from": self.amount_from,
            "amount_to": self.amount_to,
            "chain_from": self.chain_from,
            "chain_to": self.chain_to,
            "transaction_date": self.transaction_date,
            "account": self.account,
        }
