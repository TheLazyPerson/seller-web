import React, { Component } from "react";
import FullWidthContainer from "CommonContainers/fullwidthContainer";
import DivColumn from "CommonComponents/divColumn";
import StaticPageHeader from "CommonComponents/staticPageHeader";
import styles from "./static_data_page_container.module.scss";
import map from "lodash/map";

export default class StaticDataPageContainer extends Component {
  renderDescription = (description) => {
    return map(description, (descriptionItem) => {
      if (descriptionItem.type === "text") {
        return (
          <div className={styles.description_text}>{descriptionItem.value}</div>
        );
      } else if (descriptionItem.type === "points") {
        return (
          <DivColumn fillSelfHorizontal className={styles.points_container}>
            {map(descriptionItem.value, (descriptionPoint, index) => {
              return (
                <div className={styles.points_text}>{`${
                  index + 1
                }. ${descriptionPoint}`}</div>
              );
            })}
          </DivColumn>
        );
      }
    });
  };

  render() {
    const { subTitle, title, staticDataArray } = this.props;

    return (
      <FullWidthContainer>
        <DivColumn fillParent className={styles.page_container}>
          <StaticPageHeader subTitle={subTitle} title={title} />
          {map(staticDataArray, (item) => {
            switch (item.type) {
              case "last-updated":
                return <div className={styles.sub_title}>{item.value}</div>;
              case "q-n-a":
                return (
                  <DivColumn
                    fillSelfHorizontal
                    className={styles.qna_container}
                  >
                    <div className={styles.title}>{item.value.title}</div>

                    <DivColumn fillSelfHorizontal>
                      {this.renderDescription(item.value.description)}
                    </DivColumn>
                  </DivColumn>
                );
              default:
                return;
            }
          })}
        </DivColumn>
      </FullWidthContainer>
    );
  }
}
