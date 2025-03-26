import React from "react";
import styles from "./Moves.module.scss";
import { useLocalStorage } from "@uidotdev/usehooks";

function Moves() {
  const [moves] = useLocalStorage("moves", 0);
  return (
    <div className={styles.container}>
      <div>Moves: {moves}</div>
    </div>
  );
}
export default Moves;