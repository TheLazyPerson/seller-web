import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./page_not_found.module.scss";

export default class PageNotFound extends Component {
  render() {
    return (
      <FullWidthContainer>
        <DivColumn fillParent horizontalCenter verticalCenter>
          <div className={styles.title}>404</div>
          <div className={styles.message}>
            The page you requested does not exist. Click here to continue
            shopping.
          </div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}
