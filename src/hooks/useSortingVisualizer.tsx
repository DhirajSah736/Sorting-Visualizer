import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrayBar, SortingAlgorithm } from '../types';
import { generateRandomArray, resetArrayStates } from '../utils/helpers';
import { sortingAlgorithms } from '../utils/sortingAlgorithms';

export const useSortingVisualizer = (initialSize: number = 20) => {
  const [array, setArray] = useState<ArrayBar[]>(() => generateRandomArray(initialSize));
  const [arraySize, setArraySize] = useState<number>(initialSize);
  const [algorithm, setAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const maxValue = useRef<number>(100);

  // Update max value whenever array changes
  useEffect(() => {
    maxValue.current = Math.max(...array.map(item => item.value)) || 100;
  }, [array]);

  // Generate new array when size changes
  useEffect(() => {
    if (!isSorting) {
      generateNewArray();
    }
  }, [arraySize]);

  // Clean up abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Generate new array with random values
  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(arraySize);
    setArray(newArray);
    resetStats();
  }, [arraySize]);

  // Reset current array to unsorted state
  const resetArray = useCallback(() => {
    setArray(prevArray => resetArrayStates(prevArray));
    setIsSorting(false);
    setIsPaused(false);
    resetStats();
  }, []);

  // Reset statistics
  const resetStats = useCallback(() => {
    setComparisons(0);
    setSwaps(0);
  }, []);

  // Start sorting process
  const startSorting = useCallback(async () => {
    if (isSorting || array.length <= 1) return;

    // Abort previous sorting operation if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsSorting(true);
    setIsPaused(false);
    resetStats();

    try {
      // Reset array states before starting
      setArray(prevArray => resetArrayStates(prevArray));

      // Get the selected sorting algorithm
      const sortFunction = sortingAlgorithms[algorithm];

      // Run the sorting algorithm
      await sortFunction(
        array,
        setArray,
        setComparisons,
        setSwaps,
        animationSpeed,
        signal
      );

      // If not aborted, mark as completed
      if (!signal.aborted) {
        setIsSorting(false);
      }
    } catch (error) {
      console.error('Sorting error:', error);
      setIsSorting(false);
    }
  }, [array, algorithm, animationSpeed, isSorting]);

  // Pause sorting
  const pauseSorting = useCallback(() => {
    if (isSorting && !isPaused) {
      // Abort current execution
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setIsPaused(true);
    }
  }, [isSorting, isPaused]);

  // Resume sorting
  const resumeSorting = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      // Restart with current state
      startSorting();
    }
  }, [isPaused, startSorting]);

  // Update array size with boundary checks
  const handleSetArraySize = useCallback((size: number) => {
    const newSize = Math.max(5, Math.min(100, size));
    setArraySize(newSize);
  }, []);

  return {
    array,
    setArray,
    arraySize,
    setArraySize: handleSetArraySize,
    algorithm,
    setAlgorithm,
    animationSpeed,
    setAnimationSpeed,
    isSorting,
    isPaused,
    comparisons,
    swaps,
    maxValue: maxValue.current,
    generateNewArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetArray
  };
};