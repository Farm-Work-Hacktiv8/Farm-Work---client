const url = "192.168.1.9" // <<<< kasih public ip (ipv4)

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
    } catch (error) {
      dispatch(loading(false))
      dispatch(error(error))
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
      
      console.log(data, "<<<< error di action add")

      if (data.error) {
        dispatch(error(data.error))
      } else {
        dispatch(getFields(access_token))
      }
    } catch (err) {
      console.log(err, "<<<< ini di catch error add")
    }
  }
}

export function editField(payload, id, access_token) {
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

      console.log(data, "<<<< edit action")

      if (data.error) {
        dispatch(error(data.error))
      } else {
        dispatch(getFields(access_token))
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export function getPlants(fieldsId, access_token) {
  return async (dispatch) => {
    console.log(access_token, fieldsId, 'from get plants')
    try {
      dispatch(loading(true))
      const response = await fetch(`http://${url}:3000/plants/${fieldsId}`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      const data = await response.json()
      dispatch(setPlants(data.Plants))
      dispatch(loading(false))
    } catch (error) {
      dispatch(loading(false))
      dispatch(error(error))
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
      const data = await response.json()
      console.log(data, "<<<< error di action add")

      if (data.error) {
        dispatch(error(data.error))
      } else {
        dispatch(getPlants(id, access_token))
      }
    } catch (error) {
      dispatch(error(error))
    }
  }
}

export function editPlants(payload, plantId, fieldId, access_token) {
  console.log(payload, '<<< ini di edit action')
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

      const data = await response.json()

      console.log(data, "<<<< edit action")

      if (data.error) {
        dispatch(error(data.error))
      } else {
        dispatch(getPlants(fieldId, access_token))
      }
    } catch (error) {
      dispatch(error(error))
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
       if (error.error) {
        dispatch(error(error.error))
       }
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

function setHistory (payload){
  return { type: 'HISTORY/SET_HISTORY', payload}
}

export function getHistory (access_token) {
  return async (dispatch) => {
    try {
      const history = await fetch(`http://${url}:3000/history`, {
        headers: {
          access_token: access_token.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const result = await history.json()
      dispatch(setHistory(result))
    } catch (err) {
      console.log(err)
    }
  }
}