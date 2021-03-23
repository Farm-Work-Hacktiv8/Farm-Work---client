const url = "192.168.1.20" // <<<< kasih public ip (ipv4)

export function getFields(access_token) {
  return async (dispatch) => {
    try {
      dispatch(loading(true))
      const response = await fetch(`http://${url}:3000/fields`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      dispatch(setFields(data))
      dispatch(loading(false))
    } catch ({ message }) {
      dispatch(loading(false))
      console.log(message, "<<< di action")
      dispatch(error(message))
    }
  }
}

export function deleteField(id, access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/fields/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: access_token.access_token,
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
  console.log(payload, 'add field')
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/fields`, {
        method: 'POST',
        headers: {
          access_token: access_token.access_token,
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

export function editField(payload, id, access_token) {
  console.log(access_token, '<edit action')
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/fields/${id}`, {
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

export function getPlants(fieldsId, access_token) {
  return async (dispatch) => {
    console.log(access_token, fieldsId, 'from get plants')
    try {
      const response = await fetch(`http://${url}:3000/plants/${fieldsId}`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      dispatch(setPlants(data.Plants))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function deletePlant(id, fieldId, access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/plants/${fieldId}/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const message = await response.json()
      console.log(message)
      dispatch(getPlants(fieldId, access_token))
    } catch (err) {
      console.log(err)
    }
  }
}

function setPlants(payload) {
  return { type: "PLANTS/GETPLANTS", payload }
}

export function getIndicator(access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/data`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      console.log(data, "<<<<<<< di action");
      dispatch({ type: "INDICATOR/SETINDICATOR", payload: data })
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function addPlants(payload, id, access_token) {
  console.log(payload, 'payload', id, 'id', access_token, 'add plants')
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/plants/${id}`, {
        method: 'POST',
        headers: {
          access_token: access_token.access_token,
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

export function editPlants(payload, plantId, fieldId, access_token) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/plants/${fieldId}/${plantId}`, {
        method: 'PUT',
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      dispatch(getPlants(fieldId, access_token))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function setAccess_token(payload) {
  return { type: 'TOKEN/SET_TOKEN', payload }
}

export function register(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()

      console.log(data, "<<<<< di action")

      if(data.error) {
        dispatch(error(data.error))
      } else {
        dispatch(login({ username: data.username, password: payload.password }))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function login(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://${url}:3000/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const access_token = await response.json()

      if(access_token.access_token) {
        dispatch(setAccess_token(access_token))
      } else {
        dispatch(error(access_token.error))
      }

    } catch (error) {
      dispatch(error(error.error))
      console.log(error)
    }
  }
}

function loading(payload) {
  return { type: 'LOADING/SETLOADING', payload }
}

export function error(payload) {
  return { type: 'ERROR/SETERROR', payload }
}