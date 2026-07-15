import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as notificationService from '../services/notificationService';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotifications = useCallback(async (status = 'all', search = '') => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    try {
      const response = await notificationService.getNotifications(status, search);
      if (response && response.EC === 0) {
        setNotifications(response.DT || []);
        
        // Update unread count based on total unread (only if we're not filtering, or we can calculate from the data)
        // If we are filtering, we might not get the full unread count. So we can just fetch unread count separately
        // or rely on the frontend to count unread among 'all'.
        if (status === 'all' && !search) {
          const unread = (response.DT || []).filter(n => !n.is_read).length;
          setUnreadCount(unread);
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const markAsRead = async (notificationId) => {
    if (!isAuthenticated) return;
    try {
      const response = await notificationService.markAsRead(notificationId);
      if (response && response.EC === 0) {
        setNotifications(prev => 
          prev.map(n => n.notification_id === String(notificationId) ? { ...n, is_read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await notificationService.markAllAsRead();
      if (response && response.EC === 0) {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  // Tự động load thông báo lần đầu nếu đã đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [isAuthenticated, fetchNotifications]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      isLoading,
      fetchNotifications,
      markAsRead,
      markAllAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
