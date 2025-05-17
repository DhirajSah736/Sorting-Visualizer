import React, { useState, useEffect, useRef } from 'react';
import { ArrayBar, SortingAlgorithm } from '../types';
import { getBarHeight, getBarColor } from '../utils/helpers';

interface SortingVisualizerProps {
  array: ArrayBar[];
  maxValue: number;
  isSorting: boolean;
  isPaused: boolean;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  array,
  maxValue,
  isSorting,
  isPaused,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(20);
  
  // Dynamically adjust bar width based on container width and array size
  useEffect(() => {
    const updateBarWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Calculate bar width with 2px spacing
        const calculatedWidth = (containerWidth / array.length) - 2;
        setBarWidth(Math.max(2, calculatedWidth));
      }
    };
    
    // Update initially
    updateBarWidth();
    
    // Update on window resize
    window.addEventListener('resize', updateBarWidth);
    
    return () => {
      window.removeEventListener('resize', updateBarWidth);
    };
  }, [array.length]);
  
  return (
    <div
      ref={containerRef}
      className={`relative h-[400px] w-full bg-black/80 backdrop-blur-sm rounded-xl shadow-xl flex items-end justify-center p-8 border border-golden/10 transition-opacity duration-200 ${
        isPaused ? 'opacity-70' : ''
      }`}
    >
      {array.map((bar, index) => (
        <div
          key={index}
          className={`relative mx-[1px] rounded-t ${
            getBarColor(bar.state)
          } transition-all duration-200`}
          style={{
            height: getBarHeight(bar.value, maxValue),
            width: `${barWidth}px`,
          }}
        >
          {/* Value label for bigger bars */}
          {barWidth >= 20 && bar.value > 30 && (
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[8px] text-black font-semibold">
              {bar.value}
            </span>
          )}
        </div>
      ))}
      
      {/* Paused overlay */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
          <p className="text-white font-semibold text-xl">Paused</p>
        </div>
      )}
    </div>
  );
};

export default SortingVisualizer;