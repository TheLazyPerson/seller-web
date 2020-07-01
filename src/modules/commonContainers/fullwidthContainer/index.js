import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import styles from "./full_width_container.module.scss";
import PageFooter from "CommonComponents/pageFooter";
import FullwidthHeader from "CommonContainers/fullwidthHeader";

class FullWidthContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <DivColumn fillParent className={styles.page_container}>
        <DivColumn fillParent className={styles.content_container}>
          <FullwidthHeader />

          <div fillParent className={styles.inner_content_container}>
            <div fillParent className={styles.content}>
              {children}
            </div>
            <PageFooter />
          </div>
        </DivColumn>
      </DivColumn>
    );
  }
}

export default FullWidthContainer;
