import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import Modal from "@material-ui/core/Modal";
import styles from "./attach_product.module.scss";
import SearchBarComponent from "CommonComponents/searchBarComponent";
import DivRow from "CommonComponents/divRow";
import ProductListItem from "CommonComponents/productListItem";

export default class AttachProductModal extends Component {
  render() {
    const { open, onClose, productList } = this.props;

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
            className={styles.modal_container}
            onClick={event => event.stopPropagation()}
          >
            <DivRow verticalCenter className={styles.header_container}>
              <div className={styles.header_title}>ATTACH PRODUCTS</div>
              <SearchBarComponent />
            </DivRow>

            <DivColumn fillParent className={styles.content_container}>
              <DivRow fillParent className={styles.item_container}>
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
              </DivRow>
            </DivColumn>
          </DivColumn>
        </DivColumn>
      </Modal>
    );
  }
}
