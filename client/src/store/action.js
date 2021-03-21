
export function getFields(access_token) {
  console.log(access_token, '<<< token get fields')
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/fields', {
        headers: {
          access_token : access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch(setFields(data))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function deleteField(id, access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/fields/${id}`, {
        method: 'DELETE',
        headers: {
          access_token : access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const message = await response.json()
      console.log(message)
      dispatch(getFields(access_token))
    } catch (err) {
      console.log(err)
    }
  }
}

function setFields(payload) {
  return { type: "FIELDS/GETFIELDS", payload }
}

export function addField(payload, access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/fields', {
        method: 'POST',
        headers: {
          access_token : access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      console.log(data)
      dispatch(getFields(access_token))
    } catch (err) {
      console.log(err)
    }
  }
}

export function editField (payload, id, access_token) {
  
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/fields/${id}`, {
        method: 'PUT',
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      dispatch(getFields(access_token))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getPlants(FieldId, access_token) {
  console.log(access_token, '<< get plants')
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/plants/${FieldId}`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch(setPlants(data.Plants))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function deletePlant(id, fieldId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/plants/${id}`, {
        method: 'DELETE'
      })
      const message = await response.json()
      console.log(message)
      dispatch(getPlants(fieldId))
    } catch (err) {
      console.log(err)
    }
  }
}

function setPlants(payload) {
  return { type: "PLANTS/GETPLANTS", payload }
}

export function getOnePlant(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/plants/${id}`)
      const data = await response.json()
      // console.log(data, "<<<<<<< di action");
      dispatch({ type: "PLANTDETAIL/GETPLANTDETAIL", payload: data })
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function addPlants(payload, id, access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/plants/${id}`, {
        method: 'POST',
        headers: {
          access_token : access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      dispatch(getPlants(id, access_token))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function editPlants(payload, id) {
  return async (dispatch) => {
    try {
      // console.log(payload, id, "<<<<<<<<<<di action")
      const response = await fetch(`http://localhost:3000/plants/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      dispatch(getPlants(id))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

function setAccess_token (payload) {
  return {type: 'TOKEN/SET_TOKEN', payload}
}

export function register (payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      dispatch(login({username: data.username, password: payload.password}))
    } catch (err) {
      console.log(err)
    }
  }
}

export function login (payload, navigation) {
  console.log(payload, '<<< login di action')
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const access_token = await response.json()
      console.log(access_token, '<< ini di action ')
      dispatch(setAccess_token(access_token))
      if(access_token){
        navigation.navigate('HomePage')
      }else{
        navigation.navigate('Auth')
      }
    } catch (err) {
      
    }
  }
}

function setIndicator (payload){
  return {type: 'INDICATOR/SET_INDICATOR', payload}
}
export function indicator (access_token) {
  return async (dispatch) => {
    try {
      const data = await fetch(`http://localhost:3000/data`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const result = await data.json()
      dispatch(setIndicator(result))
    } catch (err) {
      console.log(err)
    }
  }
}