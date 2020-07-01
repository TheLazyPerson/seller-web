import React, { Component } from "react";
import styles from "./capsule_button.module.scss";

export default class CapsuleButton extends Component {
  render() {
    const { children, className, ...rest } = this.props;

    return (
      <button {...rest} className={`${styles.capsule_button} ${className}`}>
        <div>{children}</div>
      </button>
    );
  }
}
