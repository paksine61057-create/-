import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = "", title, action }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-lg p-6 ${className} transition-all duration-300 hover:shadow-xl`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-xl font-bold text-gray-800">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};