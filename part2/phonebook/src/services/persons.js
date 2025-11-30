import axios from "axios";
const domain = import.meta.env.VITE_API_DOMAIN;

const baseUrl = domain ? `${domain}/api/persons` : "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

export default { getAll, create, remove, update };
