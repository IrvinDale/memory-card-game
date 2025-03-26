import React, { useState } from 'react';
import Header from './components/Header/Header';
import Subtitle from './components/Subtitle/Subtitle';
import CardsGrid from './components/CardsGrid/CardsGrid';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';

import useFetch from './hooks/useFetch';
import styles from './App.module.scss';


function App() {
  const { data, loading, error } = useFetch();
  const [gameKey, setGameKey] = useState(0); // Add a key to force re-render

  // Reset handler
  function handleResetGame() {
    setGameKey((prevKey) => prevKey + 1); // Increment the key to reset the game
  }


  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  

  return (
    <div className={styles.container}>
      <Header />
      <Subtitle onReset={handleResetGame} />
      <CardsGrid key={gameKey} data={data} />
      <Footer />
    </div>
  )
}

export default App
