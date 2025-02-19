//api.js
// import axios from 'axios';

// const baseQuery = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL, // Use the environment variable
// });

// export default baseQuery;

// api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000'; // Backend API URL

const baseQuery = axios.create({
  baseURL: BASE_URL,
});

export default baseQuery;