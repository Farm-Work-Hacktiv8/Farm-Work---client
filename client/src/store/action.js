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

function setFields(payload) {
  return { type: "FIELDS/GETFIELDS", payload }
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

function setPlants(payload) {
  return { type: "PLANTS/GETPLANTS", payload }
}