import React from 'react';
import { BarChart3 } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black/95 py-4 px-6 shadow-md sticky top-0 z-10 border-b border-golden/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-golden" />
          <h1 className="text-2xl font-bold text-golden tracking-tight">
            Sorting<span className="text-teal-400">Visualizer</span>
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;