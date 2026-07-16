import apiClient from './apiClient';

export const submitContactMessage = async (data) => {
  try {
    const response = await apiClient.post('/contacts', data);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi gửi thông điệp liên hệ:', error);
    throw error;
  }
};

