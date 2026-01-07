import React from 'react';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

export default function ToolCard({ icon, title, description, to }: ToolCardProps) {
  return (
    <Link to={to} className="bg-secondary p-6 rounded-lg text-center cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:brightness-125 hover:shadow-lg hover:-translate-y-1 block">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-accent mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-tertiary mb-2">{title}</h3>
      <p className="text-tertiary">{description}</p>
    </Link>
  );
}
