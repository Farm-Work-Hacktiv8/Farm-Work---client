import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  fields: [],
  plants: [],
  indicator: {},
  access_token: '',
  loading: false
}

function plantsReducer(state = initialState, actions) {
  const { payload, type } = actions
  switch (type) {
    case "PLANTS/GETPLANTS":
      return { ...state, plants: payload }
    case "FIELDS/GETFIELDS":
      return { ...state, fields: payload }
    case "INDICATOR/SETINDICATOR":
      return { ...state, indicator: payload }
    case "TOKEN/SET_TOKEN" :
      return {...state, access_token: payload}
    default:
      return state
  }
}

const store = createStore(plantsReducer, applyMiddleware(thunk))
export default store