import apiClient from './apiClient';

export const getNotifications = async (status, search) => {
  try {
    const response = await apiClient.get('/notifications', {
      params: { status, search }
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tải thông báo:', error);
    throw error;
  }
};

export const markAsRead = async (notificationId) => {
  try {
    const response = await apiClient.patch(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái thông báo:', error);
    throw error;
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await apiClient.patch('/notifications/read-all');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi đánh dấu tất cả thông báo đã đọc:', error);
    throw error;
  }
};

