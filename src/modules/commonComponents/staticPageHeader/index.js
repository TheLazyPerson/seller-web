import React, { Component } from 'react';
import DivColumn from 'CommonComponents/divColumn';
import styles from './static_page_header.module.scss';
import reactStringReplace from 'react-string-replace';

const parseNewLine = object => {
  //const regexNewLine=/@(\w+)/g
  const newLineMatch = (match, index, offset) => {
    return <br/>
  }

  return reactStringReplace(object, "\n", newLineMatch)
}

const TermsAndConditionPage = ({title, subTitle}) => {
  return (
    <DivColumn fillSelfHorizontal horizontalCenter verticalCenter className={styles.header_container}>
      <div className={styles.sub_title}> {subTitle} </div>
      <div className={styles.title}>{parseNewLine(title)}</div>
    </DivColumn>
  );
}

export default TermsAndConditionPage;
