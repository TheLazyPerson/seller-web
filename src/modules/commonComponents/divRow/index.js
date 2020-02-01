import React, { Component } from 'react';
import styles from './div_row.module.scss';

const DivRow = ({className='', verticalCenter, horizontalCenter , fillParent, children, ...rest}) => {
  return (
    <div
     {...rest}
     className={`
      ${styles.flex_row} ${className}
      ${verticalCenter ? styles.align_center : ''}
      ${horizontalCenter ? styles.justify_center: ''}
      ${fillParent ? styles.fill_parent : ''}`}

    >
      {children}
    </div>
  )
}

export default DivRow;