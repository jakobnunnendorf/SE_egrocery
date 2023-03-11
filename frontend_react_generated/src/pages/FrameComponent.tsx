import { FunctionComponent } from "react";
import HeaderContainer from "../components/HeaderContainer";
import EGroceryContainer from "../components/EGroceryContainer";
import styles from "./FrameComponent.module.css";

const FrameComponent: FunctionComponent = () => {
  return (
    <div className={styles.headerParent}>
      <HeaderContainer />
      <div className={styles.bodyComponent}>
        <div className={styles.parent}>
          <b className={styles.b}>{`<`}</b>
          <img
            className={styles.promoHeaderIcon}
            alt=""
            src="/promo-header@2x.png"
          />
          <b className={styles.b}>{`>`}</b>
        </div>
        <div className={styles.group}>
          <div className={styles.div}>.</div>
          <div className={styles.div1}>....</div>
        </div>
        <EGroceryContainer />
      </div>
    </div>
  );
};

export default FrameComponent;
