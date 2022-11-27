import axios from 'axios';

export const API_URL =
  'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app';

/**
 * Sends incoming data to the backend.
 * @param formData {object} - Incoming data to send.
 * @param path {string} - Path example: 'todos.json'
 * @return {object} Response from post request.
 */
export const postAPI = async (formData, path) => {
  if (!formData) return;
  const response = await axios({
    method: 'post',
    url: `${API_URL}/${path}`,
    data: formData,
  });
  return response;
};

/**
 * Returns data from the backend.
 * @param {string} url - Link Example: 'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app'
 * @param {string} path - Path example: 'todos.json'
 * @return {Promise<object[]>}
 */
export const getApiItems = async (url, path) => {
  const response = await axios
    .get(`${url}/${path}`)
    .then((response) => response.data)
    .then((data) => {
      if (!data) return;
      return Object.values(data).map((object, i) => {
        const itemsKey = Object.entries(data);
        const id = itemsKey[i][0];
        return { ...object, id };
      });
    });
  return response || [];
};

/**
 * Delete data.
 * @param {string} deleteKey - Example key to delete: NHtPiDRrVXL_E4fh-4x
 * @param {string} url - Link Example: 'https://todo-e62a9-default-rtdb.europe-west1.firebasedatabase.app'
 * @return {void}
 */
export const deleteItemsAPI = async (deleteKey, url) => {
  if (!deleteKey) return;
  await axios.delete(`${url}/${deleteKey}.json`).catch((e) => console.log(e));
};

/**
 * Refreshes data
 * @param {string} updateKey
 * @param {string} url
 * @param {object} updateItem
 * @return {void}
 */
export const updateItemsApi = async (updateKey, url, updateItem) => {
  if (!updateKey && updateItem) return;
  await axios
    .patch(`${url}/${updateKey}.json`, updateItem)
    .catch((e) => console.log(e));
};
