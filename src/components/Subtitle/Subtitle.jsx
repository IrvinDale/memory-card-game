import React from "react";
import styles from "./Subtitle.module.scss";
import Score from "../Score";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

function Subtitle({ onReset }) {
  return (
    <h3 className={styles.container}>
      <Score />
      <button className={styles.resetButton} onClick={onReset} aria-label="Reset Game">
      <FontAwesomeIcon icon={faArrowRotateLeft} />
      </button>
    </h3>
  );
}

export default Subtitle;