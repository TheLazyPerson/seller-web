import React, { Component } from 'react';
import DivColumn from 'CommonComponents/divColumn';
import styles from './box_component.module.scss';

const BoxComponent = ({ title, description, className, containerStyle, titleStyle, descriptionStyle,...rest }) => {

  return (
    <DivColumn {...rest} verticalCenter horizontalCenter className={`${styles.box} ${className?className: ''} `} style={containerStyle}>
      <div className={styles.title} style={titleStyle}>{title}</div>
      <div className={styles.description} style={descriptionStyle}>{description}</div>
    </DivColumn>
  );
}

export default BoxComponent;
