import debounce from "$lib/utils/debounce"

const BASE = '/api'

const createModuleApi = (modulePath) => (subPath) => debounce((jsonBody = {}) => fetch(`${BASE}/${modulePath}/${subPath}`, {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(jsonBody)
}), 1000)

const createAttrModuleApi = createModuleApi('attr')

const updateAttrApi = createAttrModuleApi('setBlockAttrs')

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