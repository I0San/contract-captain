import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import projectsReducer from './features/projects/projectsSlice'
import eventsReducer from './features/events/eventsSlice'
import transactionsReducer from './features/transactions/transactionsSlice'

// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['events', 'transactions']
}

const rootReducer = combineReducers({
    projects: projectsReducer,
    events: eventsReducer,
    transactions: transactionsReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)