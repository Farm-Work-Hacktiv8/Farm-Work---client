export function getFields(access_token) {
  console.log(access_token, '<<< token get fields')
  return async (dispatch) => {
    try {
      const response = await fetch('http://192.168.1.15:3000/fields', {
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
      const response = await fetch(`http://192.168.1.15:3000/fields/${id}`, {
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
      const response = await fetch('http://192.168.1.15:3000/fields', {
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
  console.log(access_token, '<edit action')
  return async (dispatch) => {
    try {
      const response = await fetch(`http://192.168.1.15:3000/fields/${id}`, {
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

export function getPlants(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://192.168.1.15:3000/${id}`)
      const data = await response.json()
      dispatch(setPlants(data))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function deletePlant(id, fieldId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://192.168.1.15:3000/plants/${id}`, {
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
      const response = await fetch(`http://192.168.1.15:3000/plants/${id}`)
      const data = await response.json()
      // console.log(data, "<<<<<<< di action");
      dispatch({ type: "PLANTDETAIL/GETPLANTDETAIL", payload: data })
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function addPlants(payload, id) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://192.168.1.15:3000/plants', {
        method: 'POST',
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

export function editPlants(payload, id, fieldsId) {
  return async (dispatch) => {
    try {
      // console.log(payload, id, "<<<<<<<<<<di action")
      const response = await fetch(`http://192.168.1.15:3000/plants/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      dispatch(getPlants(fieldsId))
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
      const response = await fetch(`http://192.168.1.15:3000/register`, {
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

export function login (payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://192.168.1.15:3000/login`, {
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
    } catch (err) {
      console.log(err)
    }
  }
}