/* 
Recursive helper function that makes a deep copy of an object
This is very useful for updating state
*/

const deepCopy = obj => {
    // Falsy objects should be returned immediately, because they don't have a constructor
    if (!obj) return obj

    switch (obj.constructor) {
      case Object:
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepCopy(value)]))
      case Array:
        return obj.map(value => deepCopy(value))

      default:
        return obj
    }
  }

  export default deepCopy