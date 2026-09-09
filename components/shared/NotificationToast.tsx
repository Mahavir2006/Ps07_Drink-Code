'use client';

import React, { useEffect } from 'react';
import { useTraverseStore } from '@/lib/store/useTraverseStore';

export const NotificationToast: React.FC = () => {
  const { notificationToast, clearNotification } = useTraverseStore();

  useEffect(() => {
    if (notificationToast) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notificationToast, clearNotification]);

  if (!notificationToast) return null;

  const bgStyle =
    notificationToast.type === 'warning'
      ? 'bg-[#FF6584] text-white'
      : notificationToast.type === 'success'
      ? 'bg-[#00F5D4] text-slate-900'
      : 'bg-[#FEE440] text-slate-900';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce">
      <div
        className={`neo-card p-5 flex items-start gap-4 ${bgStyle} border-3 border-slate-900 shadow-[6px_6px_0px_#0F172A]`}
      >
        <div className="flex-1">
          <h4 className="font-cartoon text-base font-extrabold">{notificationToast.title}</h4>
          <p className="text-xs sm:text-sm font-bold font-heading mt-1 opacity-95">
            {notificationToast.message}
          </p>
        </div>

        <button
          onClick={clearNotification}
          className="p-1 rounded-lg hover:bg-black/10 transition-colors font-extrabold text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
};
