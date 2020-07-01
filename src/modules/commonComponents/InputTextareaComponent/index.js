import React, { Component } from "react";
import styles from "./input_textarea_component.module.scss";
import DivColumn from "CommonComponents/divColumn";
import tranlatorHoc from "Hoc/translatorHoc";

class InputTextareaComponent extends Component {
  render() {
    const { className, type, meta = {}, isRTL, ...rest } = this.props;

    return (
      <DivColumn
        className={`${isRTL ? styles.rtl : ""} ${className ? className : ""}`}
      >
        <textarea
          rows="4"
          {...rest}
          type={type ? type : "textarea"}
          className={styles.input_text_area}
        ></textarea>
        {meta.error && meta.touched && (
          <span className={styles.error_text}>{meta.error}</span>
        )}
      </DivColumn>
    );
  }
}

export default tranlatorHoc(InputTextareaComponent);
