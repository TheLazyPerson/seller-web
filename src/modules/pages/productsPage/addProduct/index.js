import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./add_product.module.scss";
import NavHeader from "CommonComponents/navHeader";
import { Form, Field } from "react-final-form";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputTextareaComponent from "CommonComponents/InputTextareaComponent";
import InputCheckbox from "CommonComponents/InputCheckbox";
import navigatorHoc from "Hoc/navigatorHoc";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import {
  isPhoneNumber,
  nameValidator,
  isEmptyValidator
} from "Utils/validators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import {
  createProductAction,
  uploadImage,
  editProductAction
} from "Core/modules/product/productActions";
import find from "lodash/find";
import Select from "react-select";
import map from "lodash/map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageSelectionComponent from "CommonComponents/imageSelectionComponent";
import { getBase64 } from 'Utils/generalUtils';

class AddProduct extends Component {
  state = {
    startDate: null,
    thumbnailImage: null,
    productImages: [],

    thubnailObj: null,
    productImagesObj: []
  };

  onSubmitComplete = () => {
    this.onBackPress();
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  validate = values => {
    const errors = {};
    const validators = {
      type: isEmptyValidator(values.type),
      sku: isEmptyValidator(values.sku),
      name: isEmptyValidator(values.name),
      short_description: isEmptyValidator(values.shortDescription),
      description: isEmptyValidator(values.description),
      meta_title: isEmptyValidator(values.metaTitle),
      meta_description: isEmptyValidator(values.metaDescription),
      meta_keywords: isEmptyValidator(values.metaKeywords),
      width: isEmptyValidator(values.width),
      height: isEmptyValidator(values.height),
      depth: isEmptyValidator(values.depth),
      weight: isEmptyValidator(values.weight),
      qty: isEmptyValidator(values.qty)
    };

    Object.keys(validators).forEach(key => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = form => {
    const {
      createProductAction,
      showSuccessFlashMessage,
      onSubmitComplete,
      productId,
      editProductAction
    } = this.props;
    const {thubnailObj,productImagesObj} = this.state;

    const formData = {
      type: form.type,
      sku: form.sku,
      name: form.name,
      short_description: form.shortDescription,
      description: form.description,
      price: form.price,
      cost: form.cost,
      status: form.status,
      min_price: form.minPrice,
      max_price: form.maxPrice,
      attribute_family_id: 1,
      special_price: 1000,
      special_price_from: "",
      special_price_from: "",
      thumbnail_id: thubnailObj,
      images: productImagesObj,
      meta_data: {
        meta_title: form.metaTitle,
        meta_description: form.metaDescription,
        meta_keywords: form.metaKeywords
      },
      shipping: {
        width: form.width,
        height: form.height,
        depth: form.depth,
        weight: form.weight
      },
      inventory: {
        inventory_source_id: 1,
        qty: form.qty
      },
      category_id: 1,
      locale: "en"
    };

    if (productId) {
      editProductAction(productId, formData).then(({ payload }) => {
        if (payload.code === 200 || payload.code === 201) {
          onSubmitComplete();
          showSuccessFlashMessage("Product Edited");
        }
      });
    } else {
      createProductAction(formData).then(({ payload }) => {
        if (payload.code === 200 || payload.code === 201) {
          onSubmitComplete();
          showSuccessFlashMessage("Product Added");
        }
      });
    }
  };

  getInitialValuesFromProduct = product => {
    return {
      type: product.type ? product.type : "",
      sku: product.sku ? product.sku : "",
      name: product.name ? product.name : "",
      shortDescription: product.short_description
        ? product.short_description
        : "",
      description: product.description ? product.description : "",
      metaTitle: product.meta_title ? product.meta_title : "",
      metaDescription: product.meta_description ? product.meta_description : "",
      metaKeywords: product.meta_keywords ? product.meta_keywords : "",
      price: product.price ? product.price : "",
      cost: product.cost ? product.cost : "",
      width: product.width ? product.width : "",
      height: product.height ? product.height : "",
      depth: product.depth ? product.depth : "",
      weight: product.weight ? product.weight : "",
      qty: product.qty ? product.qty : "",
      status: product.status ? product.status : "",
      minPrice: product.min_price ? product.min_price : "",
      maxPrice: product.max_price ? product.max_price : "",
      metaTitle: product.meta.meta_title ? product.meta.meta_title : "",
      metaDescription: product.meta.meta_description
        ? product.meta.meta_description
        : "",
      metaKeywords: product.meta.meta_keywords
        ? product.meta.meta_keywords
        : "",
      width: product.shipping.width ? product.shipping.width : "",
      height: product.shipping.height ? product.shipping.height : "",
      depth: product.shipping.depth ? product.shipping.depth : "",
      weight: product.shipping.weight ? product.shipping.weight : ""
    };
  };

  formatSelectorData = list => {
    return map(list, item => ({ value: item.name, label: item.name }));
  };

  uploadImage = async (file) => {
    const { uploadImage } = this.props;
    const baseImage = await getBase64(file[0]);
    return uploadImage({
      "asset_type": "productimage",
      "file_type": file[0].type,
      file: baseImage,
    });
  }

  render() {
    const CustomRenderInput = ({ input, name, value, onClick, meta }) => {
      return (
        <InputTextComponent
          {...input}
          meta={meta}
          placeholder={name}
          value={value}
          className={styles.input_text}
          onClick={onClick}
        />
      );
    };
    const {
      onClickCancel,
      productReducer: { productList, product },
      productId,
      basicReducer: { basicData }
    } = this.props;
    const {
      thumbnailImage,
      productImages
    } = this.state;

    let startDate = null;

    if (this.state.startDate) {
      startDate = this.state.startDate;
    } else if (product.specialPriceFrom) {
      startDate = new Date(product.specialPriceFrom);
    }

    const productTypes = [
      {
        value: "simple",
        label: "Simple"
      },
      {
        value: "configurable",
        label: "Configurable"
      }
    ];

    let defaultProductType = null;

    const productStatus = [
      {
        value: "draft",
        label: "Draft"
      },
      {
        value: "publish",
        label: "Publish"
      }
    ];

    let defaultproductStatus = null;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.page_container}>
          <NavHeader
            title="Add Product"
            onBackClick={this.onBackPress}
          ></NavHeader>
        </DivColumn>

        <DivColumn fillParent className={styles.page_container}>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            // initialValues={
            //   editProduct ? this.getInitialValuesFromProduct(editProduct) : null
            // }
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <div className={styles.header}>BASIC DETAILS</div>
                <DivColumn className={styles.text_input_container}>
                  <Field name="type">
                    {({ input, meta }) => (
                      <DivColumn className="input_select_container">
                        <Select
                          options={productTypes}
                          onChange={value => {
                            input.onChange(value.value);
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Product Type"
                          defaultValue={defaultProductType}
                        />
                        {meta.error && meta.touched && (
                          <span className="error_text">{meta.error}</span>
                        )}
                      </DivColumn>
                    )}
                  </Field>
                  <Field name="status">
                    {({ input, meta }) => (
                      <DivColumn className="input_select_container">
                        <Select
                          options={productStatus}
                          onChange={value => {
                            input.onChange(value.value);
                          }}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Product Status"
                          defaultValue={defaultproductStatus}
                        />
                        {meta.error && meta.touched && (
                          <span className="error_text">{meta.error}</span>
                        )}
                      </DivColumn>
                    )}
                  </Field>
                  <Field name="sku">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="SKU"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  <Field name="name">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Product Name"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                </DivColumn>

                <div className={styles.header}>DESCRIPTION</div>
                <DivColumn className={styles.text_input_container}>
                  <Field name="shortDescription">
                    {({ input, meta }) => (
                      <InputTextareaComponent
                        meta={meta}
                        {...input}
                        placeholder="Short Description"
                        className={styles.input_text_area}
                      />
                    )}
                  </Field>

                  <Field name="description">
                    {({ input, meta }) => (
                      <InputTextareaComponent
                        meta={meta}
                        {...input}
                        placeholder="Description"
                        className={styles.input_text_area}
                      />
                    )}
                  </Field>
                </DivColumn>

                <div className={styles.header}>PRICING DETAILS</div>
                <DivColumn className={styles.text_input_container}>
                  <Field name="price">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Price"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  <Field name="cost">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Cost"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  <Field name="minPrice">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Min Price"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  <Field name="maxPrice">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Max Price"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                </DivColumn>
                <div className={styles.header}>SELECT THUMBNAIL</div>
                <ImageSelectionComponent
                  files={[thumbnailImage]}
                  onDrop={file => {
                    this.uploadImage(file).then(({ payload }) => {
                      this.setState({ thumbnailImage: file, thubnailObj: payload.data.id });
                    });
                  }}
                />
                <div className={styles.header}>PRODUCT IMAGES</div>
                <ImageSelectionComponent
                  files={productImages}
                  onDrop={file => {
                    this.uploadImage(file).then(({ payload }) => {

                      const { productImages, productImagesObj } = this.state;
                      this.setState({
                        productImages: [
                          ...productImages,
                          file
                        ],
                        productImagesObj: [
                          ...productImagesObj,
                          payload.data.id
                        ]
                      });
                    });
                  }}
                />
                <div className={styles.header}>SHIPPING DETAILS</div>

                <DivColumn className={styles.text_input_container}>
                  <Field name="width">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Width"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                  <Field name="height">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Height"
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="depth">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Depth"
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="weight">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Weight"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                </DivColumn>

                <div className={styles.header}>INVENTORY DETAILS</div>

                <DivColumn className={styles.text_input_container}>
                  <Field name="qty">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="How much inventory is in store?"
                        className={styles.input_text}
                      />
                    )}
                  </Field>
                </DivColumn>

                <div className={styles.header}>META DATA</div>

                <DivColumn className={styles.text_input_container}>
                  <Field name="metaTitle">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Meta Title"
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="metaKeywords">
                    {({ input, meta }) => (
                      <InputTextComponent
                        meta={meta}
                        {...input}
                        placeholder="Meta Keywords"
                        className={styles.input_text}
                      />
                    )}
                  </Field>

                  <Field name="metaDescription">
                    {({ input, meta }) => (
                      <InputTextareaComponent
                        meta={meta}
                        {...input}
                        placeholder="Meta Description"
                        className={styles.input_text_area}
                      />
                    )}
                  </Field>
                </DivColumn>
                <DivRow className={styles.form_button_container}>
                  <SecondaryCapsuleButton onClick={onClickCancel}>
                    Cancel
                  </SecondaryCapsuleButton>
                  <CapsuleButton type="submit" disabled={submitting}>
                    Save Details
                  </CapsuleButton>
                </DivRow>
              </form>
            )}
          />
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    productReducer: state.productReducer,
    basicReducer: state.basicReducer
  };
};

const mapDispathToProps = dispatch => {
  return {
    createProductAction: bindActionCreators(createProductAction, dispatch),
    editProductAction: bindActionCreators(editProductAction, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(AddProduct));
