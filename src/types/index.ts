export type SortingAlgorithm = 
  | 'bubble' 
  | 'selection' 
  | 'insertion' 
  | 'merge' 
  | 'quick' 
  | 'heap';

export interface ArrayBar {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted';
}

export type SortingStep = {
  array: ArrayBar[];
  comparisons: number;
  swaps: number;
};

export interface AlgorithmInfo {
  name: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
}