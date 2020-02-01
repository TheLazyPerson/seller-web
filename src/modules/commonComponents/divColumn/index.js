import React, { Component } from 'react';
import styles from './div_column.module.scss';

const DivColumn = ({
  className='',
  verticalCenter,
  horizontalCenter,
  fillParent,
  fillSelfHorizontal,
  children, 
  ...rest}) => {
  
  return (
    <div
     {...rest}
     className={`
      ${styles.flex_column} ${className}
      ${verticalCenter ? styles.justify_center : ''}
      ${horizontalCenter ? styles.align_center: ''}
      ${fillSelfHorizontal ? styles.align_self_stretch: ''}
      ${fillParent ? styles.fill_parent :''}`}
    >
      {children}
    </div>
  )
}

export default DivColumn;