import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; // Update if your backend is hosted elsewhere

export async function testBackend() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return null;
  }
}
