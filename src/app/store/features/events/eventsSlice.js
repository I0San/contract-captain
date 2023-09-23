import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    // { contractId: 'nanoid', address: 'address', events: [] }
]

export const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        addEvent: (state, action) => {
            const { contractId, address, event } = action.payload
            const contractIndex = state.findIndex(c => c.contractId === contractId)
            if (contractIndex === -1) {
                state.push({ contractId, address, events: [event] })
                // state = [...state, { contract, events: [event] }]
            } else {
                state[contractIndex].events.push(event)
                //state[contractIndex].events = [event, ...state.list[contractIndex].events]
            }
        },
    }
})

export const { addEvent } = eventsSlice.actions

export default eventsSlice.reducer