import React from 'react';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ToolCard({ icon, title, description }: ToolCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-tertiary">{description}</p>
    </div>
  );
}
