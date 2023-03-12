import { FunctionComponent } from "react";
import styles from "./ItemContainer.module.css";

const ItemContainer: FunctionComponent = () => {
  return (
    <div className={styles.itemBox}>
      <img className={styles.vectorIcon} alt="" src="/vector3@2x.png" />
      <div className={styles.itemPrice}>
        <b className={styles.b}>$8.63</b>
      </div>
      <div className={styles.itemName}>
        <div className={styles.nescafeDolceGusto}>
          Nescafe Dolce Gusto Starbucks Something Idk Three Lines Maximum
        </div>
      </div>
      <div className={styles.itemDetails}>
        <div className={styles.capsulesPerPack}>
          12 capsules per pack   |   $0.72 / pc
        </div>
      </div>
      <div className={styles.addToCartButton}>
        <button className={styles.addToCartParent}>
          <b className={styles.addToCart}>ADD TO CART</b>
          <img className={styles.vectorIcon1} alt="" src="/vector4@2x.png" />
        </button>
      </div>
    </div>
  );
};

export default ItemContainer;
