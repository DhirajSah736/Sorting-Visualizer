import React from 'react';
import { AlgorithmInfo as AlgorithmInfoType } from '../types';

interface AlgorithmInfoProps {
  algorithmInfo: AlgorithmInfoType;
  isActive: boolean;
  comparisons: number;
  swaps: number;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ 
  algorithmInfo, 
  isActive,
  comparisons,
  swaps
}) => {
  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6 text-gray-200 w-full shadow-xl border border-golden/10">
      <h2 className="text-2xl font-semibold text-golden mb-2">{algorithmInfo.name}</h2>
      
      <p className="text-sm text-gray-300 mb-4">{algorithmInfo.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-teal-400 text-sm font-semibold mb-2">Time Complexity</h3>
          <div className="space-y-1 text-xs">
            <p><span className="text-golden">Best:</span> {algorithmInfo.timeComplexity.best}</p>
            <p><span className="text-golden">Average:</span> {algorithmInfo.timeComplexity.average}</p>
            <p><span className="text-golden">Worst:</span> {algorithmInfo.timeComplexity.worst}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-teal-400 text-sm font-semibold mb-2">Space Complexity</h3>
          <p className="text-xs">{algorithmInfo.spaceComplexity}</p>
          
          {isActive && (
            <div className="mt-4 space-y-1">
              <h3 className="text-teal-400 text-sm font-semibold">Current Performance</h3>
              <p className="text-xs"><span className="text-golden">Comparisons:</span> {comparisons}</p>
              <p className="text-xs"><span className="text-golden">Swaps:</span> {swaps}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmInfo;