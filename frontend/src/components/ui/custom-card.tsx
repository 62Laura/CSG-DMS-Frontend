import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export const Card = ({ 
  children, 
  className = '',
  hoverEffect = false,
  onClick,
  ...props 
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
        'transition-all duration-200',
        hoverEffect && 'hover:shadow-md hover:border-gray-300',
        'dark:bg-gray-800 dark:border-gray-700',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ 
  children, 
  className = '',
  as: Tag = 'h3' 
}: CardTitleProps) => {
  return (
    <Tag className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)}>
      {children}
    </Tag>
  );
};

export const CardDescription = ({ children, className = '' }: CardDescriptionProps) => {
  return (
    <p className={cn('mt-1 text-sm text-gray-500 dark:text-gray-400', className)}>
      {children}
    </p>
  );
};

export const CardContent = ({ 
  children, 
  className = '',
  noPadding = false 
}: CardContentProps) => {
  return (
    <div className={cn(!noPadding && 'p-6', className)}>
      {children}
    </div>
  );
};

export const CardFooter = ({ 
  children, 
  className = '',
  align = 'end' 
}: CardFooterProps) => {
  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div 
      className={cn(
        'px-6 py-4 border-t border-gray-200 dark:border-gray-700',
        'flex items-center',
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};

// Compound component pattern
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
