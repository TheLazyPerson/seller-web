import React, { Component } from "react";
import DivRow from "CommonComponents/divRow";
import DivColumn from "CommonComponents/divColumn";
import styles from "./empty_screen_component.module.scss";

export default class EmptyScreenComponent extends Component {
  render() {
    const {
      title,
      description,
      buttonTitle,
      buttonOnClick,
      className,
    } = this.props;

    return (
      <DivColumn
        horizontalCenter
        fillSelfHorizontal
        className={`${styles.component_container} ${className}`}
      >
        {title ? <div className={styles.title}>{title}</div> : null}

        {description ? (
          <div className={styles.description}>{description}</div>
        ) : null}

        <DivRow
          verticalCenter
          horizontalCenter
          className={styles.capsule_button}
          onClick={buttonOnClick}
        >
          {buttonTitle}
        </DivRow>
      </DivColumn>
    );
  }
}
