
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon: Icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
      isActive
        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
    )}
  >
    <Icon className="mr-3 h-5 w-5" />
    {label}
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      to: '/dashboard',
      icon: Home,
      label: 'Dashboard',
    },
    {
      to: '/expenses',
      icon: FileText,
      label: 'Expenses',
    },
    {
      to: '/reports',
      icon: BarChart2,
      label: 'Reports',
    },
    {
      to: '/settings',
      icon: Settings,
      label: 'Settings',
    },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={currentPath === item.to}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
