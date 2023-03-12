import { FunctionComponent } from "react";
import ItemContainer from "./ItemContainer";
import styles from "./EGroceryContainer.module.css";

const EGroceryContainer: FunctionComponent = () => {
  return (
    <div className={styles.browseTheLatestInEgroceryParent}>
      <b className={styles.browseTheLatest}>
        Browse the latest in eGROCERY selections
      </b>
      <div className={styles.grid}>
        <ItemContainer />
        <ItemContainer />
        <ItemContainer />
        <ItemContainer />
        <ItemContainer />
        <ItemContainer />
      </div>
    </div>
  );
};

export default EGroceryContainer;
