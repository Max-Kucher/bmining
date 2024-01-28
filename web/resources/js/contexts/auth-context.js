import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from '@/reducers/usersReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer
})
