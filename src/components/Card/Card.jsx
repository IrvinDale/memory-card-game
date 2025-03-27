import React, { useState, useCallback } from "react";
import styles from "./Card.module.scss";


function Card({ imgUrl, isFlipped, processTurn }) {
  return (
    <div
      className={`${styles.container} ${isFlipped ? styles.flipped : ""}`}
      onClick={processTurn}
    >
      <img
        src={imgUrl}
        alt="Card"
        className={`${styles.image} ${!isFlipped ? styles.hidden : ""}`}
      />
    </div>
  );
}

export default React.memo(Card);