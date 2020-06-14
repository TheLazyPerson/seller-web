/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import DivRow from "CommonComponents/divRow";
import styles from "./nav_header.module.scss";
import arrowLeftIcon from "Icons/arrow-right-icon-black.svg";

export default class NavHeader extends Component {
  render() {
    const { title, children, onBackClick } = this.props;

    return (
      <DivRow className={styles.header_container}>
        <DivRow
          onClick={onBackClick ? onBackClick : null}
          horizontalCenter
          verticalCenter
          className={styles.header_title}
        >
          {onBackClick ? (
            <img src={arrowLeftIcon} className={styles.back_icon} />
          ) : null}

          {title}
        </DivRow>
        {children ? children : null}
      </DivRow>
    );
  }
}
