import React from "react";
import styles from "./Score.module.scss";
import { useLocalStorage } from "@uidotdev/usehooks";

function Score() {
  const [score] = useLocalStorage("score", 0);
  return (
    <div className={styles.container}>
      <div>Score: {score}</div>
    </div>
  );
}
export default Score;