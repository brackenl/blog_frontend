import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://agile-headland-88411.herokuapp.com",
});

export default instance;
