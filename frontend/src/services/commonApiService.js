import axios from "axios";

const api = axios.create({
  baseURL: "/api/", // Base URL for all requests made with this instance
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Default content type for requests
  },
});

const getBugList = () => {
  return api.get("/getBugList");
};

const saveBugs = (payload) => {
  return api.post("/saveBugs", payload);
};

const updateBug = (payload) => {
  return api.put(`/update/${payload.id}`, payload);
};

const deleteBug = (id) => {
  return api.delete(`/delete/${id}`);
};

export { getBugList, saveBugs, updateBug, deleteBug };
