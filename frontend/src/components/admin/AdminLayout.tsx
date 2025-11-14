import { ReactNode, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Toast } from '../ui/toast-notification';
import { LoadingSpinner } from '../ui/loading-spinner';
import AdminNavbar from './AdminNavbar';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
} as const;

const AnimatedPage = ({ 
  children, 
  key 
}: { 
  children: ReactNode;
  key: string;
}) => (
  <motion.div
    key={key}
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    className="h-full"
  >
    {children}
  </motion.div>
);

export default function AdminLayout({ 
  children, 
  activeSection, 
  onSectionChange 
}: AdminLayoutProps) {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    visible: boolean;
  } | null>(null);

  // Show toast notification
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type, visible: true });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setToast(prev => prev ? { ...prev, visible: false } : null);
    }, 5000);
  }, []);

  // Handle section change with loading state
  const handleSectionChange = useCallback((section: string) => {
    setIsLoading(true);
    onSectionChange(section);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [onSectionChange]);

  // Show toast on route change
  useEffect(() => {
    const sectionName = activeSection
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    showToast(`Navigated to ${sectionName}`, 'info');
  }, [activeSection, location.pathname, showToast]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast?.visible && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(prev => prev ? { ...prev, visible: false } : null)}
            className="fixed top-4 right-4 z-50"
          />
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
          >
            <LoadingSpinner size="lg" className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <AdminNavbar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={isSidebarCollapsed}
        onCollapsedChange={setIsSidebarCollapsed}
      />

      <div 
        className={cn(
          'transition-all duration-300 pt-16 md:pt-0',
          isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64',
          'min-h-screen'
        )}
      >
        <div className="p-4 md:p-6">
          <AnimatePresence mode="wait">
            <AnimatedPage key={location.pathname}>
              {children}
            </AnimatedPage>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
