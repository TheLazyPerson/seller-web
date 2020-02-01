import React, { Component } from 'react';
import styles from './input_checkbox.module.scss';
import DivRow from 'CommonComponents/divRow';
import translatorHoc from 'Hoc/translatorHoc';

class InputCheckbox extends Component {
  render() {
   const {
     text,
     textStyle,
     isRTL,
    } = this.props;

     return (
       <DivRow className={isRTL? styles.rtl : ''} verticalCenter>
         <input type="checkbox" className={styles.input_checkbox}/>
         <div className={`${styles.checkbox_text} ${textStyle}`}>{text}</div>
       </DivRow>
     )
  }
}

export default translatorHoc(InputCheckbox);