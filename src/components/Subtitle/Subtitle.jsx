import React from "react";
import styles from "./Subtitle.module.scss";
import Score from "../Score";

function Subtitle() {
  return (
    <h3 className={styles.container}>
      <Score />
    </h3>
  );
}

export default Subtitle;