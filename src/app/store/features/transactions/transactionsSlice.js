import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    // { contractId: 'nanoid', address: 'address', transactions: [] }
]

export const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            const { contractId, address, tx } = action.payload
            const contractIndex = state.findIndex(c => c.contractId === contractId)
            if (contractIndex === -1) {
                state.push({ contractId, address, transactions: [tx] })
            } else {
                state[contractIndex].transactions.push(tx)
            }
        },
    }
})

export const { addTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer