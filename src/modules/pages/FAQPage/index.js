import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import StaticPageHeader from "CommonComponents/staticPageHeader";
import styles from "./faq_page.module.scss";
import map from "lodash/map";
import closeIcon from "Icons/close-icon-black.svg";
import { faq } from "Constants/faqConstants";

export default class FAQPage extends Component {
  state = {
    faq
  };

  onClickFaqItem = index => {
    const { faq } = this.state;

    const updatedFaq = map(faq, (faqItem, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...faqItem,
          isSelected: !faqItem.isSelected
        };
      }

      return faqItem;
    });

    this.setState({ faq: updatedFaq });
  };

  render() {
    const { faq } = this.state;

    return (
      <FullWidthContainer>
        <DivColumn fillParent className={styles.page_container}>
          <StaticPageHeader subTitle="HELP" title="Frequenty Asked Questions" />
          <div className={styles.page_title}>Home Expo</div>
          <DivColumn fillParent>
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
        </DivColumn>
      </FullWidthContainer>
    );
  }
}
