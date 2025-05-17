import { ArrayBar, SortingStep } from '../types';
import { delay, deepCopy, getAnimationDelay } from './helpers';

// Generic sorting function type
type SortFunction = (
  array: ArrayBar[],
  setArray: (array: ArrayBar[]) => void,
  setComparisons: (value: number) => void,
  setSwaps: (value: number) => void,
  animationSpeed: number,
  signal: AbortSignal
) => Promise<void>;

// Bubble sort algorithm
export const bubbleSort: SortFunction = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  animationSpeed,
  signal
) => {
  const arrayCopy = deepCopy(array);
  const n = arrayCopy.length;
  let comparisons = 0;
  let swaps = 0;
  let isSorted = false;

  for (let i = 0; i < n - 1 && !isSorted; i++) {
    isSorted = true;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (signal.aborted) return;
      
      // Set comparing state
      arrayCopy[j].state = 'comparing';
      arrayCopy[j + 1].state = 'comparing';
      setArray([...arrayCopy]);
      comparisons++;
      setComparisons(comparisons);
      
      // Wait for animation
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      // Swap if needed
      if (arrayCopy[j].value > arrayCopy[j + 1].value) {
        // Set swapping state
        arrayCopy[j].state = 'swapping';
        arrayCopy[j + 1].state = 'swapping';
        setArray([...arrayCopy]);
        
        // Wait for animation
        await delay(getAnimationDelay(animationSpeed));
        
        if (signal.aborted) return;
        
        // Perform swap
        [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
        swaps++;
        setSwaps(swaps);
        isSorted = false;
      }
      
      // Reset state
      arrayCopy[j].state = 'default';
      arrayCopy[j + 1].state = 'default';
    }
    
    // Mark the last item as sorted
    arrayCopy[n - i - 1].state = 'sorted';
    setArray([...arrayCopy]);
  }
  
  // Mark remaining elements as sorted
  for (let i = 0; i < n; i++) {
    if (arrayCopy[i].state !== 'sorted') {
      arrayCopy[i].state = 'sorted';
      setArray([...arrayCopy]);
      await delay(10);
    }
  }
};

// Selection sort algorithm
export const selectionSort: SortFunction = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  animationSpeed,
  signal
) => {
  const arrayCopy = deepCopy(array);
  const n = arrayCopy.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    // Mark current position
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    
    for (let j = i + 1; j < n; j++) {
      if (signal.aborted) return;
      
      // Set comparing state
      arrayCopy[j].state = 'comparing';
      setArray([...arrayCopy]);
      comparisons++;
      setComparisons(comparisons);
      
      // Wait for animation
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      // Check if current element is smaller
      if (arrayCopy[j].value < arrayCopy[minIndex].value) {
        // Reset previous minIndex
        if (minIndex !== i) {
          arrayCopy[minIndex].state = 'default';
        }
        minIndex = j;
      } else {
        // Reset current element
        arrayCopy[j].state = 'default';
      }
      
      setArray([...arrayCopy]);
    }
    
    // Swap with minimum element if needed
    if (minIndex !== i) {
      // Set swapping state
      arrayCopy[i].state = 'swapping';
      arrayCopy[minIndex].state = 'swapping';
      setArray([...arrayCopy]);
      
      // Wait for animation
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      // Perform swap
      [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
      swaps++;
      setSwaps(swaps);
    }
    
    // Mark as sorted
    arrayCopy[i].state = 'sorted';
    if (minIndex !== i) {
      arrayCopy[minIndex].state = 'default';
    }
    
    setArray([...arrayCopy]);
  }
  
  // Mark last element as sorted
  arrayCopy[n - 1].state = 'sorted';
  setArray([...arrayCopy]);
};

// Insertion sort algorithm
export const insertionSort: SortFunction = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  animationSpeed,
  signal
) => {
  const arrayCopy = deepCopy(array);
  const n = arrayCopy.length;
  let comparisons = 0;
  let swaps = 0;
  
  // Mark first element as sorted
  arrayCopy[0].state = 'sorted';
  setArray([...arrayCopy]);
  
  for (let i = 1; i < n; i++) {
    if (signal.aborted) return;
    
    // Current element to be inserted
    const current = arrayCopy[i].value;
    arrayCopy[i].state = 'comparing';
    setArray([...arrayCopy]);
    
    await delay(getAnimationDelay(animationSpeed));
    
    if (signal.aborted) return;
    
    let j = i - 1;
    
    // Find position to insert
    while (j >= 0 && arrayCopy[j].value > current) {
      if (signal.aborted) return;
      
      comparisons++;
      setComparisons(comparisons);
      
      // Set comparing state
      arrayCopy[j].state = 'comparing';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      // Shift element
      arrayCopy[j].state = 'swapping';
      arrayCopy[j + 1].state = 'swapping';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      // Move element
      arrayCopy[j + 1].value = arrayCopy[j].value;
      swaps++;
      setSwaps(swaps);
      
      // Reset state but keep sorted
      arrayCopy[j].state = 'sorted';
      arrayCopy[j + 1].state = 'comparing';
      
      setArray([...arrayCopy]);
      j--;
    }
    
    // Place current element
    arrayCopy[j + 1].value = current;
    arrayCopy[j + 1].state = 'sorted';
    
    setArray([...arrayCopy]);
  }
};

// Merge sort algorithm
export const mergeSort: SortFunction = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  animationSpeed,
  signal
) => {
  const arrayCopy = deepCopy(array);
  let comparisons = 0;
  let swaps = 0;
  
  const merge = async (left: number, mid: number, right: number) => {
    if (signal.aborted) return;
    
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    // Create temp arrays
    const leftArray = Array(n1);
    const rightArray = Array(n2);
    
    // Copy data to temp arrays
    for (let i = 0; i < n1; i++) {
      leftArray[i] = { ...arrayCopy[left + i] };
    }
    for (let j = 0; j < n2; j++) {
      rightArray[j] = { ...arrayCopy[mid + 1 + j] };
    }
    
    // Merge temp arrays back
    let i = 0;
    let j = 0;
    let k = left;
    
    while (i < n1 && j < n2) {
      if (signal.aborted) return;
      
      // Compare elements
      comparisons++;
      setComparisons(comparisons);
      
      // Highlight comparing elements
      arrayCopy[left + i].state = 'comparing';
      arrayCopy[mid + 1 + j].state = 'comparing';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      if (leftArray[i].value <= rightArray[j].value) {
        // Set swapping state
        arrayCopy[k].state = 'swapping';
        setArray([...arrayCopy]);
        
        await delay(getAnimationDelay(animationSpeed));
        
        if (signal.aborted) return;
        
        // Copy from left array
        arrayCopy[k].value = leftArray[i].value;
        swaps++;
        setSwaps(swaps);
        i++;
      } else {
        // Set swapping state
        arrayCopy[k].state = 'swapping';
        setArray([...arrayCopy]);
        
        await delay(getAnimationDelay(animationSpeed));
        
        if (signal.aborted) return;
        
        // Copy from right array
        arrayCopy[k].value = rightArray[j].value;
        swaps++;
        setSwaps(swaps);
        j++;
      }
      
      // Reset state
      arrayCopy[k].state = 'default';
      k++;
    }
    
    // Copy remaining elements
    while (i < n1) {
      if (signal.aborted) return;
      
      arrayCopy[k].state = 'swapping';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      arrayCopy[k].value = leftArray[i].value;
      swaps++;
      setSwaps(swaps);
      
      arrayCopy[k].state = 'default';
      i++;
      k++;
    }
    
    while (j < n2) {
      if (signal.aborted) return;
      
      arrayCopy[k].state = 'swapping';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      arrayCopy[k].value = rightArray[j].value;
      swaps++;
      setSwaps(swaps);
      
      arrayCopy[k].state = 'default';
      j++;
      k++;
    }
  };
  
  const mergeSortHelper = async (left: number, right: number) => {
    if (signal.aborted) return;
    
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      // Sort first and second halves
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      
      // Merge the sorted halves
      await merge(left, mid, right);
    }
  };
  
  await mergeSortHelper(0, arrayCopy.length - 1);
  
  // Mark all as sorted
  for (let i = 0; i < arrayCopy.length; i++) {
    if (signal.aborted) return;
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await delay(10);
  }
};

// Quick sort algorithm
export const quickSort: SortFunction = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  animationSpeed,
  signal
) => {
  const arrayCopy = deepCopy(array);
  let comparisons = 0;
  let swaps = 0;
  
  const partition = async (low: number, high: number): Promise<number> => {
    if (signal.aborted) return low;
    
    // Choose pivot (last element)
    const pivot = arrayCopy[high].value;
    arrayCopy[high].state = 'comparing';
    setArray([...arrayCopy]);
    
    await delay(getAnimationDelay(animationSpeed));
    
    if (signal.aborted) return low;
    
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (signal.aborted) return low;
      
      // Compare with pivot
      arrayCopy[j].state = 'comparing';
      setArray([...arrayCopy]);
      
      comparisons++;
      setComparisons(comparisons);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return low;
      
      if (arrayCopy[j].value <= pivot) {
        i++;
        
        // Swap elements
        if (i !== j) {
          arrayCopy[i].state = 'swapping';
          arrayCopy[j].state = 'swapping';
          setArray([...arrayCopy]);
          
          await delay(getAnimationDelay(animationSpeed));
          
          if (signal.aborted) return low;
          
          [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
          swaps++;
          setSwaps(swaps);
        }
      }
      
      // Reset states
      if (i >= 0) arrayCopy[i].state = 'default';
      arrayCopy[j].state = 'default';
    }
    
    // Place pivot in correct position
    if (i + 1 !== high) {
      arrayCopy[i + 1].state = 'swapping';
      arrayCopy[high].state = 'swapping';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return low;
      
      [arrayCopy[i + 1], arrayCopy[high]] = [arrayCopy[high], arrayCopy[i + 1]];
      swaps++;
      setSwaps(swaps);
    }
    
    // Reset states
    arrayCopy[i + 1].state = 'default';
    arrayCopy[high].state = 'default';
    setArray([...arrayCopy]);
    
    return i + 1;
  };
  
  const quickSortHelper = async (low: number, high: number) => {
    if (signal.aborted) return;
    
    if (low < high) {
      // Partition and get pivot position
      const pivotIndex = await partition(low, high);
      
      if (signal.aborted) return;
      
      // Sort elements before and after pivot
      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);
    } else if (low === high) {
      // Single element is sorted
      arrayCopy[low].state = 'sorted';
      setArray([...arrayCopy]);
    }
  };
  
  await quickSortHelper(0, arrayCopy.length - 1);
  
  // Mark all as sorted
  for (let i = 0; i < arrayCopy.length; i++) {
    if (signal.aborted) return;
    arrayCopy[i].state = 'sorted';
    setArray([...arrayCopy]);
    await delay(10);
  }
};

// Heap sort algorithm
export const heapSort: SortFunction = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  animationSpeed,
  signal
) => {
  const arrayCopy = deepCopy(array);
  const n = arrayCopy.length;
  let comparisons = 0;
  let swaps = 0;
  
  // Build max heap
  const heapify = async (size: number, rootIndex: number) => {
    if (signal.aborted) return;
    
    let largest = rootIndex;
    const left = 2 * rootIndex + 1;
    const right = 2 * rootIndex + 2;
    
    // Compare with left child
    if (left < size) {
      arrayCopy[largest].state = 'comparing';
      arrayCopy[left].state = 'comparing';
      setArray([...arrayCopy]);
      
      comparisons++;
      setComparisons(comparisons);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      if (arrayCopy[left].value > arrayCopy[largest].value) {
        largest = left;
      }
      
      // Reset states
      arrayCopy[rootIndex].state = 'default';
      arrayCopy[left].state = 'default';
    }
    
    // Compare with right child
    if (right < size) {
      arrayCopy[largest].state = 'comparing';
      arrayCopy[right].state = 'comparing';
      setArray([...arrayCopy]);
      
      comparisons++;
      setComparisons(comparisons);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      if (arrayCopy[right].value > arrayCopy[largest].value) {
        largest = right;
      }
      
      // Reset states
      arrayCopy[largest].state = 'default';
      arrayCopy[right].state = 'default';
    }
    
    // If largest is not root
    if (largest !== rootIndex) {
      arrayCopy[rootIndex].state = 'swapping';
      arrayCopy[largest].state = 'swapping';
      setArray([...arrayCopy]);
      
      await delay(getAnimationDelay(animationSpeed));
      
      if (signal.aborted) return;
      
      // Swap
      [arrayCopy[rootIndex], arrayCopy[largest]] = [arrayCopy[largest], arrayCopy[rootIndex]];
      swaps++;
      setSwaps(swaps);
      
      // Reset states
      arrayCopy[rootIndex].state = 'default';
      arrayCopy[largest].state = 'default';
      setArray([...arrayCopy]);
      
      // Recursively heapify the affected sub-tree
      await heapify(size, largest);
    }
  };
  
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (signal.aborted) return;
    await heapify(n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    if (signal.aborted) return;
    
    // Move current root to end
    arrayCopy[0].state = 'swapping';
    arrayCopy[i].state = 'swapping';
    setArray([...arrayCopy]);
    
    await delay(getAnimationDelay(animationSpeed));
    
    if (signal.aborted) return;
    
    [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
    swaps++;
    setSwaps(swaps);
    
    // Mark sorted
    arrayCopy[i].state = 'sorted';
    arrayCopy[0].state = 'default';
    setArray([...arrayCopy]);
    
    // Call heapify on reduced heap
    await heapify(i, 0);
  }
  
  // Mark the first element as sorted
  arrayCopy[0].state = 'sorted';
  setArray([...arrayCopy]);
};

// Map algorithm name to its function
export const sortingAlgorithms: Record<string, SortFunction> = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
};