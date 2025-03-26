import React from "react";
import styles from "./BestScore.module.scss";
import { useLocalStorage } from "@uidotdev/usehooks";

function BestScore() {
  const [bestScore] = useLocalStorage("bestScore", null);
  return (
    <div className={styles.container}>
      <div>Best Score: {bestScore}</div>
    </div>
  );
}
export default BestScore;