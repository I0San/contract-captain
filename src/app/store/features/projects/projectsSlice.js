import { createSlice, nanoid } from "@reduxjs/toolkit"

// const initialState = {
//     list: [
//         { name: 'Default', contracts: [] }
//     ]
// }

const initialState = [
    { id: 'IoSanX696IQBDnOmIs', name: 'Default', chain: 1, contracts: [] }
]

export const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        addProject: {
            reducer: (state, action) => { 
                state.push(action.payload) 
            },
            prepare: (val) => {
                const id = nanoid()
                return { payload: { id, ...val } }
            }
        },
        updateProjectName: (state, action) => {
            const { id, name } = action.payload
            const projectIndex = state.findIndex(p => p.id === id)
            state[projectIndex].name = name
        },
        updateProjectNetwork: (state, action) => {
            const { id, network } = action.payload
            const projectIndex = state.findIndex(p => p.id === id)
            state[projectIndex].chain = network
        },
        deleteProject: (state, action) => {
            const { id } = action.payload
            return state.filter(p => p.id !== id)
        },
        addContract: (state, action) => {
            const { projectId, contract } = action.payload
            const projectIndex = state.findIndex(p => p.id === projectId)
            state[projectIndex].contracts.push(contract)
        },
        deleteContract: (state, action) => {
            const { projectId, contractId } = action.payload
            const projectIndex = state.findIndex(p => p.id === projectId)
            state[projectIndex].contracts = state[projectIndex].contracts.filter(c => c.id !== contractId)
        },
        updateContractName: (state, action) => {
            const { projectId, contractId, name } = action.payload
            const projectIndex = state.findIndex(p => p.id === projectId)
            const contractIndex = state[projectIndex].contracts.findIndex(c => c.id === contractId)
            state[projectIndex].contracts[contractIndex].name = name
        }
    }
})

export const { addProject, updateProjectName, updateProjectNetwork, deleteProject, addContract, deleteContract, updateContractName } = projectsSlice.actions

export default projectsSlice.reducer