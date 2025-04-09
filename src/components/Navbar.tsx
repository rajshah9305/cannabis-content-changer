
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PlusCircle, LineChart, History, Cannabis, BookOpen, Store } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string): string => {
    return location.pathname === path 
      ? 'text-cannabis-700 border-b-2 border-cannabis-500'
      : 'text-muted-foreground hover:text-cannabis-600';
  };
  
  return (
    <nav className="bg-background border-b border-border fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center space-x-2">
            <Cannabis className="h-6 w-6 text-cannabis-600" />
            <span className="text-xl font-bold">Cannabis Tracker</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/" className={`${isActive('/')} py-1 px-2`}>
              Dashboard
            </Link>
            <Link to="/strains" className={`${isActive('/strains')} py-1 px-2`}>
              Strains
            </Link>
            <Link to="/store" className={`${isActive('/store')} py-1 px-2`}>
              Store
            </Link>
            <Link to="/history" className={`${isActive('/history')} py-1 px-2`}>
              History
            </Link>
            <Link to="/insights" className={`${isActive('/insights')} py-1 px-2`}>
              Insights
            </Link>
          </div>
          
          <Link to="/add" className="hidden md:inline-flex items-center px-4 py-2 rounded-md bg-cannabis-500 text-white hover:bg-cannabis-600 transition-colors">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Entry
          </Link>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
        <div className="flex justify-around items-center py-2">
          <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-cannabis-600' : 'text-muted-foreground'}`}>
            <LineChart className="h-6 w-6" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="/strains" className={`flex flex-col items-center p-2 ${location.pathname === '/strains' ? 'text-cannabis-600' : 'text-muted-foreground'}`}>
            <BookOpen className="h-6 w-6" />
            <span className="text-xs">Strains</span>
          </Link>
          <Link to="/add" className="flex flex-col items-center p-2 bg-cannabis-500 text-white rounded-full -mt-6 shadow-lg">
            <PlusCircle className="h-8 w-8" />
            <span className="text-xs">Add</span>
          </Link>
          <Link to="/history" className={`flex flex-col items-center p-2 ${location.pathname === '/history' ? 'text-cannabis-600' : 'text-muted-foreground'}`}>
            <History className="h-6 w-6" />
            <span className="text-xs">History</span>
          </Link>
          <Link to="/store" className={`flex flex-col items-center p-2 ${location.pathname === '/store' ? 'text-cannabis-600' : 'text-muted-foreground'}`}>
            <Store className="h-6 w-6" />
            <span className="text-xs">Store</span>
          </Link>
          <Link to="/insights" className={`flex flex-col items-center p-2 ${location.pathname === '/insights' ? 'text-cannabis-600' : 'text-muted-foreground'}`}>
            <LineChart className="h-6 w-6" />
            <span className="text-xs">Insights</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
