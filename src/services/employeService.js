import axios from "axios";

const API_URL = "http://localhost:8000/api/employes";

export const getAllEmployes = () => axios.get(API_URL);
export const getEmploye = (matricule) => axios.get(`${API_URL}/${matricule}`);
export const createEmploye = (data) => axios.post(API_URL, data);
export const updateEmploye = (matricule, data) => axios.put(`${API_URL}/${matricule}`, data);
export const deleteEmploye = (matricule) => axios.delete(`${API_URL}/${matricule}`);
