import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = "rounded-lg font-medium transition-all duration-300";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-moroccan-red text-white hover:bg-moroccan-red/90",
    secondary: "bg-moroccan-gold text-white hover:bg-moroccan-gold/90",
    outline: "border border-moroccan-gold text-moroccan-red hover:bg-moroccan-gold/10"
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};