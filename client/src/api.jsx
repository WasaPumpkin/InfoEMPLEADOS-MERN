//api.js
// import axios from 'axios';

// const baseQuery = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL, // Use the environment variable
// });

// export default baseQuery;

// api.js
// api.js
import axios from 'axios';

const BASE_URL = 'https://infoempleados-3q11.onrender.com'; // Production backend API URL

const baseQuery = axios.create({
  baseURL: BASE_URL,
});

export default baseQuery;