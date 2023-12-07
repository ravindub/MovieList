// Importing the Axios library
import axios from 'axios';

// Creating and exporting an Axios instance with default configurations
export default axios.create({
  baseURL: 'http://localhost:8081',
  headers: { 'Content-Type': 'application/json' }
});
