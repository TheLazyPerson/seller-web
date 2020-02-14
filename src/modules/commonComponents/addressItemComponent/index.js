import React, { Component } from "react";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import styles from './address_item_component.module.scss';
import translatorHoc from 'Hoc/translatorHoc';

class AddressItemComponent extends Component {
  render() {
    const {
      address,
      onClickEdit,
      onClickRemove,
      isSelected,
      onClickItem,
      translate,
      isRTL
    } = this.props;
    const phoneNumber = isRTL ?`${address.country_code}-${address.phone_number} ${translate('address_item_component.phone_number')}` :`${translate('address_item_component.phone_number')} ${address.country_code}-${address.phone_number}` ;

    return (
      <DivColumn 
        className={`${styles.address_item} ${isRTL ? styles.rtl : ''} ${isSelected ? styles.selected_address: ''}`}
        onClick={onClickItem ? () => onClickItem(address) : null}
      >
        <DivColumn fillParent className={styles.item_content_container}>
          <div className={styles.item_name}>{address.name}</div>
          <div className={styles.item_address}>
            {address.address1}, <br />
            {address.address2}, <br />
            {address.city}, {address.state}, <br />
            {address.country} - {address.postcode}
          </div>
          <div className={styles.item_phonenumber}>
            {phoneNumber}
          </div>
        </DivColumn>
        <DivRow className={styles.action_container}>
          <div
            className={styles.action_button}
            onClick={(event) => {
              event.stopPropagation();
              onClickEdit(address.id)
            }}
          >
            {translate('address_item_component.edit')}
          </div>
          <div
            className={styles.action_button}
            onClick={(event) => {
              event.stopPropagation();
              onClickRemove(address.id)
            }}
          >
            {translate('address_item_component.remove')}
          </div>
        </DivRow>
      </DivColumn>
    );
  }
}

export default translatorHoc(AddressItemComponent);
