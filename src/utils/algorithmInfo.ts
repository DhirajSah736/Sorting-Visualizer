import { AlgorithmInfo } from '../types';

export const algorithmInfo: Record<string, AlgorithmInfo> = {
  bubble: {
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  selection: {
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist, and repeatedly selects the smallest element from the unsorted sublist.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  merge: {
    name: 'Merge Sort',
    description: 'An efficient, stable, divide and conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
  },
  quick: {
    name: 'Quick Sort',
    description: 'A highly efficient sorting algorithm that uses a divide-and-conquer strategy with a pivot element to partition the array into two sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
  },
  heap: {
    name: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
  },
};