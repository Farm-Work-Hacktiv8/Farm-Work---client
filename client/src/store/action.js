export function getFields() {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/fields')
      const data = await response.json()
      dispatch(setFields(data))
    } catch ({ message }) {
      console.log(message)
    }
  }
}

export function deleteField(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/fields/${id}`, {
        method: 'DELETE'
      })
      const message = await response.json()
      console.log(message)
      dispatch(getFields())
    } catch (err) {
      console.log(err)
    }
  }
}

function setFields(payload) {
  return { type: "FIELDS/GETFIELDS", payload }
}

export function addField (payload) {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/fields/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      const data = await response.json()
      console.log(data)
      dispatch(getFields())
    } catch (err) {
      console.log(err)
    }
  }
}

export function getPlants(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/plants/?fieldsId=${id}`)
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