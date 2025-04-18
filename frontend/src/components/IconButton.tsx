import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  label: string;
  badgeCount?: number;
  className?: string;
}

export const IconButton = ({
  icon,
  onClick,
  label,
  badgeCount,
  className = ''
}: IconButtonProps) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`relative p-2 ${className}`}
  >
    {icon}
    {badgeCount ? (
      <span className="absolute -top-1 -right-1 bg-moroccan-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {badgeCount}
      </span>
    ) : null}
  </button>
);