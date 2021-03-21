import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  fields: [],
  plants: [],
  plantDetail: {},
  access_token: '',
  indicator : {}
}

function plantsReducer(state = initialState, actions) {
  const { payload, type } = actions
  switch (type) {
    case "PLANTS/GETPLANTS":
      return { ...state, plants: payload }
    case "FIELDS/GETFIELDS":
      return { ...state, fields: payload }
    case "PLANTDETAIL/GETPLANTDETAIL":
      return { ...state, plantDetail: payload }
    case "TOKEN/SET_TOKEN" :
      return {...state, access_token: payload}
    case "INDICATOR/SET_INDICATOR" :
      return {...state, indicator: payload}
    default:
      return state
  }
}

const store = createStore(plantsReducer, applyMiddleware(thunk))
export default store