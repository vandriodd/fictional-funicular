import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

import { notifications as seedNotifications, type AppNotification } from '@/data/mock';

type NotificationsContextValue = {
  notifications: AppNotification[];
  unreadCount: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(seedNotifications);

  const markAllRead = useCallback(() => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    );
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
      markAllRead,
      markRead,
    }),
    [notifications, markAllRead, markRead],
  );

  return <NotificationsContext value={value}>{children}</NotificationsContext>;
}

export function useNotifications() {
  const value = use(NotificationsContext);
  if (!value) {
    throw new Error('useNotifications must be used inside a NotificationsProvider');
  }
  return value;
}
