import { ArrayBar } from '../types';

// Generate random array
export const generateRandomArray = (size: number): ArrayBar[] => {
  return Array.from({ length: size }, () => ({
    value: Math.floor(Math.random() * 100) + 5,
    state: 'default'
  }));
};

// Reset array states
export const resetArrayStates = (array: ArrayBar[]): ArrayBar[] => {
  return array.map(item => ({
    ...item,
    state: 'default'
  }));
};

// Delay function for animations
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Get animation delay based on speed (1-100)
export const getAnimationDelay = (speed: number): number => {
  // Map speed (1-100) to delay (500ms - 1ms)
  // Higher speed = lower delay
  return Math.floor(500 - (speed * 4.99));
};

// Get calculated bar height
export const getBarHeight = (value: number, maxValue: number): string => {
  // Calculate percentage of maxValue (plus some padding)
  const heightPercentage = (value / maxValue) * 70;
  return `${heightPercentage}%`;
};

// Get bar color based on state
export const getBarColor = (state: ArrayBar['state']): string => {
  switch (state) {
    case 'comparing':
      return 'bg-yellow-500';
    case 'swapping':
      return 'bg-red-500';
    case 'sorted':
      return 'bg-green-500';
    default:
      return 'bg-golden';
  }
};

// Create a deep copy of the array
export const deepCopy = <T>(array: T[]): T[] => {
  return JSON.parse(JSON.stringify(array));
};