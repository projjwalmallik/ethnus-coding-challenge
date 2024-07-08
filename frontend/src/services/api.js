import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

export const fetchTransactions = async (month, page, perPage, search) => {
  const params = { month, page, perPage, search };
  return axios.get(`${API_URL}/list`, { params });
};

export const fetchStatistics = async (month) => {
  const params = { month };
  return axios.get(`${API_URL}/statistics`, { params });
};

export const fetchBarChart = async (month) => {
  const params = { month };
  return axios.get(`${API_URL}/bar-chart`, { params });
};

export const fetchPieChart = async (month) => {
  const params = { month };
  return axios.get(`${API_URL}/pie-chart`, { params });
};

export const fetchCombinedData = async (month) => {
  const params = { month };
  return axios.get(`${API_URL}/combined`, { params });
};
