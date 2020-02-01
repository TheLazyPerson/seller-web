import React, { Component } from 'react';
import styles from './input_text_component.module.scss';
import DivColumn from 'CommonComponents/divColumn';
import tranlatorHoc from 'Hoc/translatorHoc';

class InputTextComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      className,
      type,
      meta = {},
      isRTL,
      ...rest
    } = this.props;

    return (
      <DivColumn className={`${isRTL ? styles.rtl : ''} ${className ? className : ''}`}>
        <input
          {...rest}
          type={type ? type : 'text'}
          className={styles.input_text}
        />
        {meta.error && meta.touched && <span className={styles.error_text}>{meta.error}</span>}
      </DivColumn>
    )
  }
}

export default tranlatorHoc(InputTextComponent);
