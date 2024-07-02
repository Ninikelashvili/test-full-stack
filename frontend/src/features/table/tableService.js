import axios from "axios";

const API_URL = "/api/tables/";

const getTables = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const createTable = async (tableData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(`${API_URL}create`, tableData, config);
  return response.data;
};

const tablesService = { getTables, createTable };

export default tablesService;
