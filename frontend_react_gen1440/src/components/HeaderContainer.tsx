import { FunctionComponent } from "react";
import ContainerHeaderSecondRow from "./ContainerHeaderSecondRow";
import styles from "./HeaderContainer.module.css";

const HeaderContainer: FunctionComponent = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerFirstRow}>
        <div className={styles.logo}>
          <div className={styles.e}>e</div>
          <div className={styles.grocery}>GROCERY</div>
          <b className={styles.singapore}>Singapore</b>
        </div>
        <div className={styles.accountManagement}>
          <div className={styles.loggedInAsParent}>
            <div className={styles.loggedInAs}>Logged in as</div>
            <b className={styles.joshuaVargas}>Joshua Vargas</b>
          </div>
          <div className={styles.vectorParent}>
            <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
            <b className={styles.e}>Manage Account</b>
          </div>
        </div>
      </div>
      <ContainerHeaderSecondRow />
    </div>
  );
};

export default HeaderContainer;
