import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./edit_product.module.scss";
import NavHeader from "CommonComponents/navHeader";
import { Form, Field } from "react-final-form";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import InputCheckboxTreeComponent from "CommonComponents/InputCheckboxTreeComponent";
import InputTextareaComponent from "CommonComponents/InputTextareaComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";

import { isEmptyValidator } from "Utils/validators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import { createProductAction } from "Core/modules/product/productActions";
import { getProductFormAction } from "Core/modules/product/productActions";
import ImageSelectionComponent from "CommonComponents/imageSelectionComponent";
import { getBase64 } from "Utils/generalUtils";
import { getCategoryTreeAction } from "Core/modules/category/categoryActions";

import map from "lodash/map";

import Select from "react-select";

class EditProduct extends Component {
  state = {
    productImages: [],

    productImagesObj: [],
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

  validate = (values) => {
    const errors = {};
    const validators = {
      type: isEmptyValidator(values.type),
      sku: isEmptyValidator(values.sku),
      attribute_family_id: isEmptyValidator(values.attributeFamily),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const {
      createProductAction,
      showSuccessFlashMessage,
      onSubmitComplete,
    } = this.props;

    const formData = {
      type: form.type,
      sku: form.sku,
      attribute_family_id: form.attributeFamily,
    };

    createProductAction(formData).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        this.onSubmitComplete();
        showSuccessFlashMessage("Product Added");
      }
    });
  };

  formatSelectorData = (list) => {
    return map(list, (item) => ({ value: item.id, label: item.name }));
  };

  formatAttributeOptionData = (list) => {
    return map(list, (item) => ({ value: item.id, label: item.label }));
  };

  uploadImage = async (file) => {
    const { uploadImage } = this.props;
    const baseImage = await getBase64(file[0]);
    return uploadImage({
      asset_type: "productimage",
      file_type: file[0].type,
      file: baseImage,
    });
  };

  getFormItem = (attribute) => {
    const { type, slug, name } = attribute;

    if (type === "text") {
      return (
        <DivColumn className={styles.text_input_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <InputTextComponent
                meta={meta}
                {...input}
                placeholder={name}
                className={styles.input_text}
              />
            )}
          </Field>
        </DivColumn>
      );
    } else if (type === "select") {
      const { options } = attribute;
      const attributeOptions = this.formatAttributeOptionData(options);
      return (
        <DivColumn className={styles.text_input_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <DivColumn className="input_select_container">
                <Select
                  options={attributeOptions}
                  onChange={(value) => {
                    input.onChange(value.value);
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder={name}
                  defaultValue={null}
                />
                {meta.error && meta.touched && (
                  <span className="error_text">{meta.error}</span>
                )}
              </DivColumn>
            )}
          </Field>
        </DivColumn>
      );
    } else if (type === "boolean") {
      const attributeOptions = [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ];
      return (
        <DivColumn className={styles.text_input_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <DivColumn className="input_select_container">
                <Select
                  options={attributeOptions}
                  onChange={(value) => {
                    input.onChange(value.value);
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder={name}
                  defaultValue={null}
                />
                {meta.error && meta.touched && (
                  <span className="error_text">{meta.error}</span>
                )}
              </DivColumn>
            )}
          </Field>
        </DivColumn>
      );
    } else if (type === "textarea") {
      return (
        <DivColumn className={styles.text_input_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <InputTextareaComponent
                meta={meta}
                {...input}
                placeholder={name}
                className={styles.input_text_area}
              />
            )}
          </Field>
        </DivColumn>
      );
    } else if (type === "price") {
      return (
        <DivColumn className={styles.text_input_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <InputTextComponent
                meta={meta}
                {...input}
                placeholder={name}
                className={styles.input_text}
              />
            )}
          </Field>
        </DivColumn>
      );
    } else if (type === "file") {
      const { productImages } = this.state;

      return (
        <DivColumn className={styles.text_file_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <ImageSelectionComponent
                files={productImages}
                onDrop={(file) => {
                  this.uploadImage(file).then(({ payload }) => {
                    const { productImages, productImagesObj } = this.state;
                    this.setState({
                      productImages: [...productImages, file],
                      productImagesObj: [...productImagesObj, payload.data.id],
                    });
                  });
                }}
              />
            )}
          </Field>
        </DivColumn>
      );
    } else if (type === "tree-checkbox") {
      const {
        getCategoryTreeAction,
        categoryReducer: { categories },
      } = this.props;
      return (
        <InitialPageLoader initialPageApi={getCategoryTreeAction}>
          <DivColumn className={styles.text_input_container}>
            <Field name={slug}>
              {({ input, meta }) => (
                <InputCheckboxTreeComponent data={categories} />
              )}
            </Field>
          </DivColumn>
        </InitialPageLoader>
      );
    }
  };

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
      productReducer: { prouctForm },
      match: { params },
      basicReducer: { basicData, attributeFamilies },
      getProductFormAction,
    } = this.props;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.page_container}>
          <NavHeader
            title="Edit Product"
            onBackClick={this.onBackPress}
          ></NavHeader>
        </DivColumn>
        <DivColumn fillParent className={styles.page_container}>
          <InitialPageLoader
            initialPageApi={() => getProductFormAction(params.productId)}
          >
            <Form
              onSubmit={this.onSubmit}
              validate={this.validate}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form className={styles.form_container} onSubmit={handleSubmit}>
                  <DivColumn
                    className={styles.text_input_container}
                  ></DivColumn>
                  {map(prouctForm, (attributeGroup) => {
                    const { name, attributes: fieldList } = attributeGroup;
                    return (
                      <DivColumn>
                        <div className={styles.header}>{name}</div>
                        <div>
                          {map(fieldList, (attribute) => {
                            return this.getFormItem(attribute);
                          })}
                        </div>
                      </DivColumn>
                    );
                  })}
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
          </InitialPageLoader>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productReducer: state.productReducer,
    basicReducer: state.basicReducer,
    categoryReducer: state.categoryReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    createProductAction: bindActionCreators(createProductAction, dispatch),
    getProductFormAction: bindActionCreators(getProductFormAction, dispatch),
    getCategoryTreeAction: bindActionCreators(getCategoryTreeAction, dispatch),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(EditProduct));
