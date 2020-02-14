import React , { Component } from 'react'
import DivColumn from 'CommonComponents/divColumn';
import styles from './product_list_item.module.scss';
import exhibitionImage from 'Images/exhibition-item-1.jpg';

class ProductListItem extends Component {
  render() {
    return (
        <DivColumn horizontalCenter className={styles.product_list_item_container}>
          <div className={styles.title}>Adidas Red Shoes</div>
          <div className={styles.description}>Elegant. Timeless. The quitessensial symbol of love</div>
          <img src={exhibitionImage} className={styles.image}/>
          <div className={styles.action_button}>Mark Out of Stock</div>
        </DivColumn>
    );
  }
}

export default ProductListItem;
