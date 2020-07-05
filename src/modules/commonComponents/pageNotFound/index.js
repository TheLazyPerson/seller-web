import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import styles from "./page_not_found.module.scss";
import translatorHoc from "Hoc/translatorHoc";

class PageNotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { translate } = this.props;
    return (
      <FullWidthContainer>
        <DivColumn fillParent horizontalCenter verticalCenter>
          <div className={styles.title}>
            {translate("page_not_found.number")}
          </div>
          <div className={styles.message}>
            {translate("page_not_found.subtitle")}
          </div>
        </DivColumn>
      </FullWidthContainer>
    );
  }
}

export default translatorHoc(PageNotFound);
