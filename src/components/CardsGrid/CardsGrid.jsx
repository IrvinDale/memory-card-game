import React, { useState, useEffect } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Card from "../Card";
import Loader from "../Loader";
import styles from "./CardsGrid.module.scss";
import useFetch from "../../hooks/useFetch";

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
// State Management
const [images, setImages] = useState([]);
const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
const [matchedCards, setMatchedCards] = useState([]); // Track matched pairs
const [score, setScore] = useLocalStorage("score", 0);
const [isLoading, setIsLoading] = useState(true); // Initial loading state
const [isRevealing, setIsRevealing] = useState(true); // Initial reveal state

    // Custom hook for fetching images
    const { data: fetchedData, fetchData, error } = useFetch();

      // Initialize game when new data is fetched
  useEffect(() => {
    if (fetchedData?.images) {
      initializeGame(fetchedData.images);
    }
  }, [fetchedData]);

    // Initialize game with images
  function initializeGame(newImages) {
    setIsLoading(true); // Start loading
    const duplicatedImages = [...newImages, ...newImages]; // Duplicate images for pairs
    const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5); // Shuffle images
    setImages(shuffledImages);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setIsLoading(false); // End loading
     // Reveal all cards for 3 seconds
    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false); // End revealing
    }, 3000);
  }


  // Core game logic
  function processTurn(imageId, index) {
    if (isRevealing || flippedCards.length === 2 || flippedCards.some((card) => card.index === index)) {
      return; // Prevent flipping more than 2 cards or flipping matched cards
    }

    const newFlippedCards = [...flippedCards, { imageId, index }];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;

      // Check for a match
      if (firstCard.imageId === secondCard.imageId) {
        setMatchedCards([...matchedCards, firstCard.index, secondCard.index]);
        const newScore = score + 1;
        setScore(newScore);
      }

      // Reset flipped cards after a short delay
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }

  if (error) {
    return <p>Failed to fetch data</p>;
  }

  if (isLoading) {
    return <Loader message="Loading new images..." />;
  }

  return (
    <div className={styles.container}>
      {images.map((item, index) => (
        <Card
          key={getKey()}
          imgUrl={item?.image?.original?.url || ""}
          isFlipped={
            isRevealing || flippedCards.some((card) => card.index === index) || matchedCards.includes(index)
          }
          processTurn={() => processTurn(item?.id, index)}
        />
      ))}
    </div>
  );
}

export default React.memo(CardsGrid);