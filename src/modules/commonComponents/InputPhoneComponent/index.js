import React, { Component } from "react";
import styles from "./input_phone_component.module.scss";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";

import tranlatorHoc from "Hoc/translatorHoc";

class InputPhoneComponent extends Component {
  render() {
    const { className, type, meta = {}, isRTL, ...rest } = this.props;

    return (
      <DivRow
        className={` ${styles.input_text_container} ${
          isRTL ? styles.rtl : ""
        } ${className ? className : ""}`}
      >
        +965
        <input
          {...rest}
          type={type ? type : "text"}
          className={styles.input_text}
        />
        {meta.error && meta.touched && (
          <span className={styles.error_text}>{meta.error}</span>
        )}
      </DivRow>
    );
  }
}

export default tranlatorHoc(InputPhoneComponent);
