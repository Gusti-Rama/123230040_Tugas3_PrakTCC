import axios from 'axios';

const API_URL = "https://backend-rama-73763759634.us-central1.run.app/";

export const getNotes = () => axios.get(API_URL);
export const createNote = (data) => axios.post(API_URL, data);
export const updateNote = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteNote = (id) => axios.delete(`${API_URL}/${id}`);