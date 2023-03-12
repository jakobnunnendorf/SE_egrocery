import { FunctionComponent } from "react";
import styles from "./ContainerHeaderSecondRow.module.css";

const ContainerHeaderSecondRow: FunctionComponent = () => {
  return (
    <div className={styles.headerSecondRow}>
      <div className={styles.navigationButtons}>
        <div className={styles.categoriesButton}>
          <div className={styles.c}>C</div>
          <b className={styles.ategories}>ategories</b>
        </div>
        <div className={styles.categoriesButton}>
          <div className={styles.c}>P</div>
          <b className={styles.ategories}>romos</b>
        </div>
        <div className={styles.categoriesButton}>
          <div className={styles.c}>S</div>
          <b className={styles.ategories}>upport</b>
        </div>
      </div>
      <div className={styles.searchBox}>
        <img className={styles.vectorIcon} alt="" src="/vector1@2x.png" />
        <div className={styles.searchTerm}>Search term</div>
      </div>
      <div className={styles.cartButton}>
        <div className={styles.cartText}>
          <div className={styles.c}>C</div>
          <b className={styles.art}>art</b>
        </div>
        <div className={styles.itemIndicatorAndIcon}>
          <b className={styles.items}>0 items</b>
          <img className={styles.vectorIcon1} alt="" src="/vector2@2x.png" />
        </div>
      </div>
    </div>
  );
};

export default ContainerHeaderSecondRow;
