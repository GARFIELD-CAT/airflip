import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Account {
  id: number
  wallet_key: string
  bonus_amount: number
  bonus_level: number | null
}

export interface CreateAccountRequest {
  wallet_key: string
  bonus_amount?: number
  bonus_level?: number | null
}

export interface UpdateAccountRequest {
  wallet_key?: string
  bonus_amount?: number
  bonus_level?: number | null
}

export interface Transaction {
  id: number
  hash: string
  token_from: string
  token_to: string
  amount_from: number
  amount_to: number
  chain_from: number
  chain_to: number
  transaction_date: string
  account: number
}

export const accountsApi = {
  getByWalletKey: async (walletKey: string): Promise<Account> => {
    const response = await api.get(`/accounts/get_by_wallet_key/${walletKey}`)
    return response.data
  },

  create: async (data: CreateAccountRequest): Promise<Account> => {
    const response = await api.post('/accounts/create/', data)
    return response.data
  },

  update: async (id: number, data: UpdateAccountRequest): Promise<Account> => {
    const response = await api.patch(`/accounts/update/${id}`, data)
    return response.data
  },

  getTransactions: async (
    walletKey: string,
    options?: {
      sortDesc?: boolean
      skip?: number
      limit?: number
    }
  ): Promise<Transaction[]> => {
    const params = new URLSearchParams()
    params.append('wallet_key', walletKey)
    
    if (options?.sortDesc !== undefined) {
      params.append('sort_desc', options.sortDesc.toString())
    }
    if (options?.skip !== undefined) {
      params.append('skip', options.skip.toString())
    }
    if (options?.limit !== undefined) {
      params.append('limit', options.limit.toString())
    }

    const response = await api.get(`/accounts/get_transactions_by_wallet_key?${params}`)
    return response.data
  },
} 