const contentstack = require("contentstack")

const Stack = contentstack.Stack({
  api_key: process.env.REACT_APP_APIKEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  region: "us",
})

export default {
  getJsonRte(ctUid, entryUid) {
    return new Promise((resolve, reject) => {
      Stack.ContentType(ctUid)
        .Entry(entryUid)
        .toJSON()
        .includeEmbeddedItems() // include embedded items
        .fetch()
        .then((entry) => {  
          console.log('raw json response: ', entry)
        resolve(entry)
      },
      (error) => {
        reject(error)
      })
      })
    }
  }
