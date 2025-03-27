import React, { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Card from "../Card";
import Loader from "../Loader";
import styles from "./CardsGrid.module.scss";
import useFetch from "../../hooks/useFetch";

const getKey = () => crypto.randomUUID();

function CardsGrid(data) {
  const [images, setImages] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // Track flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // Track matched pairs
  const [moves, setMoves] = useLocalStorage("moves", 0); // Track the number of moves
  const [bestScore, setBestScore] = useLocalStorage("bestScore", null); // Track the best score
  const [isLoading, setIsLoading] = useState(true); // Initial loading state
  const [isRevealing, setIsRevealing] = useState(true); // Initial reveal state
  const [cardsLoading, setCardsLoading] = useState(0);

  useEffect(() => {
    console.log("CardsGrid re-rendered"); // Debug
  });

    // Custom hook for fetching images
    const { data: fetchedData, error } = useFetch();

      // Initialize game when new data is fetched
  useEffect(() => {
    if (fetchedData?.images) {
      initializeGame(fetchedData.images);
    }
  }, [fetchedData]);

  // Initialize game with images
  const initializeGame = useCallback((newImages) => {
    setIsLoading(true); 
    const duplicatedImages = [...newImages, ...newImages]; // Duplicate images for pairs
    const shuffledImages = duplicatedImages.sort(() => Math.random() - 0.5); // Shuffle images
    setImages(shuffledImages);
    setCardsLoading(shuffledImages.length); // Set the initial loading count
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0); // Reset moves
    setIsLoading(false); 
  }, [setMoves]);

    // Callback to notify when a card finishes loading
    const handleCardLoaded = useCallback(() => {
      setCardsLoading((prev) => {
        const newCount = Math.max(prev - 1, 0);
        console.log("Card loaded. Remaining cards:", newCount); // Debug
        return newCount;
      });
    }, []);

  // Start revealing cards once all cards are loaded
  useEffect(() => {
    if (cardsLoading === 0 && images.length > 0) {
      console.log("All cards loaded. Starting reveal...");
      setIsRevealing(true); // Start revealing cards
      setTimeout(() => setIsRevealing(false), 3000); // Reveal cards for 3 seconds
    }
  }, [cardsLoading, images]);

  useEffect(() => {
    console.log("Updated cardsLoading:", cardsLoading); // Debug
  }, [cardsLoading]);


  // Core game logic
  const processTurn = useCallback(
    (imageId, index) => {
      // Prevent flipping more than 2 cards, flipping matched cards, or flipping the same card twice
      if (
        isRevealing || 
        flippedCards.length === 2 || 
        flippedCards.some((card) => card.index === index) ||
        matchedCards.includes(index)
      ) {
        return; 
      }

      const newFlippedCards = [...flippedCards, { imageId, index }];
      setFlippedCards(newFlippedCards);

      if (newFlippedCards.length === 2) {
        const currentMoves = moves + 1; // Calculate the current moves dynamically
        setMoves(currentMoves); // Increment moves on every attempt

        const [firstCard, secondCard] = newFlippedCards;

        // Check for a match
        if (firstCard.imageId === secondCard.imageId) {
          const updatedMatchedCards = [...matchedCards, firstCard.index, secondCard.index];
          setMatchedCards(updatedMatchedCards);

          // Check if the game is completed
          if (updatedMatchedCards.length === images.length) {

          // Update best score if the current moves are better
          setBestScore((prevBest) => {
            const newBestScore = prevBest === null || prevBest === 0 || currentMoves < prevBest ? currentMoves : prevBest;
            return newBestScore;
          });

          }
        }
        // Reset flipped cards after a short delay
        setTimeout(() => setFlippedCards([]), 1000);
      }
    },
    [isRevealing, flippedCards, matchedCards, moves, images.length, setMoves, setBestScore]
  );

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
          key={index}
          imgUrl={item?.image?.original?.url || ""}
          isFlipped={
            isRevealing || flippedCards.some((card) => card.index === index) || matchedCards.includes(index)
          }
          processTurn={() => processTurn(item?.id, index)}
          onCardLoaded={handleCardLoaded} 
        />
      ))}
    </div>
  );
}

export default React.memo(CardsGrid);