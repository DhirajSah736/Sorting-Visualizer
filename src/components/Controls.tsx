import React, { useState } from 'react';
import { SortingAlgorithm } from '../types';
import { Play, Pause, RefreshCw, BarChart3 } from 'lucide-react';

interface ControlsProps {
  algorithm: SortingAlgorithm;
  setAlgorithm: (algorithm: SortingAlgorithm) => void;
  arraySize: number;
  setArraySize: (size: number) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isSorting: boolean;
  isPaused: boolean;
  generateNewArray: () => void;
  startSorting: () => void;
  pauseSorting: () => void;
  resumeSorting: () => void;
  resetArray: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  algorithm,
  setAlgorithm,
  arraySize,
  setArraySize,
  animationSpeed,
  setAnimationSpeed,
  isSorting,
  isPaused,
  generateNewArray,
  startSorting,
  pauseSorting,
  resumeSorting,
  resetArray,
}) => {
  const algorithms: { value: SortingAlgorithm; label: string }[] = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'selection', label: 'Selection Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'quick', label: 'Quick Sort' },
    { value: 'heap', label: 'Heap Sort' },
  ];

  return (
    <div className="bg-black/80 backdrop-blur-sm p-6 rounded-xl shadow-xl text-white w-full border border-golden/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Algorithm Selector */}
        <div className="space-y-2">
          <label htmlFor="algorithm" className="block text-sm font-medium text-golden">
            Algorithm
          </label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as SortingAlgorithm)}
            disabled={isSorting}
            className="w-full px-3 py-2 bg-gray-900 border border-golden/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden/50 text-white"
          >
            {algorithms.map((algo) => (
              <option key={algo.value} value={algo.value}>
                {algo.label}
              </option>
            ))}
          </select>
        </div>

        {/* Array Size */}
        <div className="space-y-2">
          <label htmlFor="array-size" className="block text-sm font-medium text-golden">
            Array Size: {arraySize}
          </label>
          <input
            id="array-size"
            type="range"
            min={5}
            max={100}
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isSorting}
            className="w-full accent-golden bg-gray-800 rounded-lg h-2 appearance-none cursor-pointer"
          />
        </div>

        {/* Animation Speed */}
        <div className="space-y-2">
          <label htmlFor="animation-speed" className="block text-sm font-medium text-golden">
            Speed: {animationSpeed}
          </label>
          <input
            id="animation-speed"
            type="range"
            min={1}
            max={100}
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
            className="w-full accent-golden bg-gray-800 rounded-lg h-2 appearance-none cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-end gap-2">
          <button
            onClick={generateNewArray}
            disabled={isSorting && !isPaused}
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 border border-golden/30 text-white px-3 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Generate New Array"
          >
            <BarChart3 className="h-4 w-4" />
            <span>New</span>
          </button>

          {!isSorting ? (
            <button
              onClick={startSorting}
              className="flex-1 flex items-center justify-center gap-1 bg-golden hover:bg-golden/90 text-black font-medium px-3 py-2 rounded-lg transition-colors duration-200"
              title="Start Sorting"
            >
              <Play className="h-4 w-4" />
              <span>Sort</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeSorting}
              className="flex-1 flex items-center justify-center gap-1 bg-teal-500 hover:bg-teal-600 text-black font-medium px-3 py-2 rounded-lg transition-colors duration-200"
              title="Resume Sorting"
            >
              <Play className="h-4 w-4" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={pauseSorting}
              className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-3 py-2 rounded-lg transition-colors duration-200"
              title="Pause Sorting"
            >
              <Pause className="h-4 w-4" />
              <span>Pause</span>
            </button>
          )}

          <button
            onClick={resetArray}
            disabled={!isSorting && !isPaused}
            className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 border border-golden/30 text-white px-3 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reset Array"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;