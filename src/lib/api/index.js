const BASE = '/api'

const createModuleApi = (modulePath) => (subPath) => (jsonBody = {}) => fetch(`${BASE}/${modulePath}/${subPath}`, {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(jsonBody)
}).then(r => r.json())

const createAttrModuleApi = createModuleApi('attr')

const updateAttrApi = createAttrModuleApi('setBlockAttrs')

const getAttrApi = createAttrModuleApi('getBlockAttrs')

/**
 * Update block attrs
 * @param {string} id block ID
 * @param {object} attr attributes object
 * @returns 
 */
export const updateAttr = (id, attrs) => updateAttrApi({
  id,
  attrs
})

/**
 * Get block attributes
 * @param {string} id block ID
 * @returns 
 */
export const getBlockAttrs = (id) => getAttrApi({ id })