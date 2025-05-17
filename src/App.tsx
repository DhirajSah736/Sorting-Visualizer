import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Controls from './components/Controls';
import SortingVisualizer from './components/SortingVisualizer';
import AlgorithmInfo from './components/AlgorithmInfo';
import { useSortingVisualizer } from './hooks/useSortingVisualizer';
import { algorithmInfo } from './utils/algorithmInfo';

function App() {
  const {
    array,
    arraySize,
    setArraySize,
    algorithm,
    setAlgorithm,
    animationSpeed,
    setAnimationSpeed,
    isSorting,
    isPaused,
    comparisons,
    swaps,
    maxValue,
    generateNewArray,
    startSorting,
    pauseSorting,
    resumeSorting,
    resetArray
  } = useSortingVisualizer(30);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar />
      
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          {/* Controls Section */}
          <Controls
            algorithm={algorithm}
            setAlgorithm={setAlgorithm}
            arraySize={arraySize}
            setArraySize={setArraySize}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            isSorting={isSorting}
            isPaused={isPaused}
            generateNewArray={generateNewArray}
            startSorting={startSorting}
            pauseSorting={pauseSorting}
            resumeSorting={resumeSorting}
            resetArray={resetArray}
          />
          
          {/* Visualizer */}
          <SortingVisualizer
            array={array}
            maxValue={maxValue}
            isSorting={isSorting}
            isPaused={isPaused}
          />
          
          {/* Algorithm Information */}
          <AlgorithmInfo
            algorithmInfo={algorithmInfo[algorithm]}
            isActive={isSorting || isPaused}
            comparisons={comparisons}
            swaps={swaps}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;