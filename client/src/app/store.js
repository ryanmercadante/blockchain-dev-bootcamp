import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import counterReducer from '../features/counter/counterSlice'
import web3Reducer from '../features/web3/web3Slice'

const middleware = [
  ...getDefaultMiddleware({
    // serializableCheck: {
    //   // Ignore these action types
    //   ignoredActions: ['your/action/type'],
    //   // Ignore these field paths in all actions
    //   ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
    //   // Ignore these paths in the state
    //   ignoredPaths: ['items.dates'],
    // },
    serializableCheck: false,
  }),
  logger,
]

export default configureStore({
  reducer: {
    counter: counterReducer,
    web3: web3Reducer,
  },
  middleware,
})
