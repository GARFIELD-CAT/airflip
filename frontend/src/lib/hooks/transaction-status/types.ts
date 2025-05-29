export type TransactionCheckResult = {
  status: 'success' | 'error' | 'pending'
  completed: boolean
}
