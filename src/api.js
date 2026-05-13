import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/notes";

export const getNotes = () => axios.get(API_URL);
export const createNote = (data) => axios.post(API_URL, data);
export const updateNote = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);