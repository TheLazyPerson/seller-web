import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import Modal from "@material-ui/core/Modal";
import styles from "./attach_product.module.scss";
import SearchBarComponent from "CommonComponents/searchBarComponent";
import DivRow from "CommonComponents/divRow";
import ProductListItem from "CommonComponents/productListItem";
import map from "lodash/map";

class AttachProductModal extends Component {
  render() {
    const {
      open,
      onClose,
      onClickAttachProduct,
      onClickRemoveProduct,
      translate,
      languageCode,
      isRTL,
    } = this.props;
    const { productList, exhibitionId } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
      >
        <DivColumn
          style={{ width: "100%", height: "100%" }}
          verticalCenter
          horizontalCenter
          onClick={onClose}
        >
          <DivColumn
            className={` ${styles.modal_container} ${isRTL ? styles.rtl : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <DivRow verticalCenter className={styles.header_container}>
              <div className={styles.header_title}>
                {translate("exhibition_details_page.attach_modal.title")}
              </div>
              <SearchBarComponent />
            </DivRow>

            <DivColumn fillParent className={styles.content_container}>
              <DivRow className={styles.item_container}>
                {map(productList, (product) => (
                  <ProductListItem
                    product={product}
                    actionType={"attach_product"}
                    exhibitionId={exhibitionId}
                    onClickAttachProduct={onClickAttachProduct}
                    onClickRemoveProduct={onClickRemoveProduct}
                    languageCode={languageCode}
                  />
                ))}
              </DivRow>
            </DivColumn>
          </DivColumn>
        </DivColumn>
      </Modal>
    );
  }
}

export default AttachProductModal;
