import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'https://stg.dhunjam.in/account/admin',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers if needed
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdminDetails = async (userId) => {
    try {
      const response = await axiosInstance.get(`/${userId}`, {
        headers: {
          Authorization: `Bearer ${userId}`,
          // Add any other headers if needed
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateAdminDetails = async (userId, token, updatedData) => {
    try {
      const response = await axiosInstance.put(`/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Add any other headers if needed
        },
      });
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  