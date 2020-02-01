import React, { Component } from 'react';
import styles from './horizontal_border.module.scss';

export default class HorizontalBorder extends Component {
  render() {
    const { className } = this.props;

     return(
       <div className={`${styles.horizontal_border_div} ${className?className:''}`} />
     )
  }
}