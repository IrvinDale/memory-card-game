import React, { useState, useEffect, useRef } from "react";
import Loader from "../Loader";
import styles from "./Card.module.scss";


function Card({ imgUrl, isFlipped, processTurn, onCardLoaded }) {
  const [isLoading, setIsLoading] = useState(true);
  const hasLoadedRef = useRef(false); // Use a ref to track if the image has already been processed

  const handleImageLoad = () => {
    console.log("hasLoadedRef.current:", hasLoadedRef.current);
    if (!hasLoadedRef.current) {
        console.log("Image loaded successfully:", imgUrl); // Debug
        hasLoadedRef.current = true; // Mark the image as processed
        setIsLoading(false);
        if (onCardLoaded) {
          console.log("Calling onCardLoaded for:", imgUrl); // Debug
          onCardLoaded(); // Notify the parent that this card has finished loading
        }
      } else {
      console.log("handleImageLoad called again but ignored for:", imgUrl); // Debug
    }
  };

  useEffect(() => {
    if (!imgUrl) {
      console.error("Invalid imgUrl:", imgUrl); // Debug
      return;
    }

    const img = new Image();
    img.src = imgUrl;

    if (img.complete) {
      console.log("Image is already cached:", imgUrl); // Debug
      handleImageLoad();
    }
  }, [imgUrl]);


  return (
    <div
      className={`${styles.container} ${isFlipped ? styles.flipped : ""}`}
      onClick={processTurn}
    >
      {isLoading && (
        <div className={styles.loaderContainer}>
          <Loader message="Loading..." />
        </div>
      )}
      <img
        src={imgUrl}
        alt="Card"
        onLoad={handleImageLoad}
        className={`${styles.image} ${!isFlipped ? styles.hidden : ""}`}
      />
    </div>
  );
}

export default React.memo(Card);