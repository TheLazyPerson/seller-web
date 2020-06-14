/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import navigatorHoc from "Hoc/navigatorHoc";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import map from "lodash/map";
import styles from "./faq.module.scss";
import { faq } from "Constants/faqConstants";
import closeIcon from "Icons/close-icon-black.svg";

class FAQ extends Component {
  state = {
    faq,
  };

  onClickFaqItem = (index) => {
    const { faq } = this.state;

    const updatedFaq = map(faq, (faqItem, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...faqItem,
          isSelected: !faqItem.isSelected,
        };
      }

      return faqItem;
    });
    this.setState({ faq: updatedFaq });
  };

  render() {
    const { faq } = this.state;

    return (
      <DivColumn fillParent className={styles.faq_landing_container}>
        {map(faq, (faqItem, index) => {
          return (
            <DivColumn
              className={`${styles.faq_container} ${
                faqItem.isSelected ? styles.is_selected : ""
              }`}
            >
              <DivRow
                verticalCenter
                className={styles.faq_title_container}
                onClick={() => this.onClickFaqItem(index)}
              >
                <div className={styles.faq_title}>{faqItem.title}</div>
                <img src={closeIcon} className={styles.title_close_icon} />
              </DivRow>
              <div className={styles.faq_description}>
                {faqItem.description}
              </div>
            </DivColumn>
          );
        })}
      </DivColumn>
    );
  }
}

export default navigatorHoc(FAQ);
