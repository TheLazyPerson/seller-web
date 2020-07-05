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
import navigatorHoc from "Hoc/navigatorHoc";
import InitialPageLoader from "CommonContainers/initialPageLoader";

import { isEmptyValidator } from "Utils/validators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import { createProductAction } from "Core/modules/product/productActions";
import { getAttributeFamilyAction } from "Core/modules/basic/basicActions";
import map from "lodash/map";

import Select from "react-select";

class AddProduct extends Component {
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
      // type: isEmptyValidator(values.type),
      sku: isEmptyValidator(values.sku),
      attribute_family_id: isEmptyValidator(values.attributeFamily),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const { createProductAction, navigateTo } = this.props;

    const formData = {
      type: "simple",
      sku: form.sku,
      attribute_family_id: form.attributeFamily,
    };

    createProductAction(formData).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        const productId = payload.data.product.id;
        navigateTo("edit-product", { productId });
      }
    });
  };

  formatSelectorData = (list) => {
    return map(list, (item) => ({ value: item.id, label: item.name }));
  };

  render() {
    // const CustomRenderInput = ({ input, name, value, onClick, meta }) => {
    //   return (
    //     <InputTextComponent
    //       {...input}
    //       meta={meta}
    //       placeholder={name}
    //       value={value}
    //       className={styles.input_text}
    //       onClick={onClick}
    //     />
    //   );
    // };
    const {
      onClickCancel,
      basicReducer: { attributeFamilies },
      getAttributeFamilyAction,
    } = this.props;

    // const productTypes = [
    //   {
    //     value: "simple",
    //     label: "Simple",
    //   },
    //   {
    //     value: "configurable",
    //     label: "Configurable",
    //   },
    // ];

    const attributeFamiliesOptions = this.formatSelectorData(attributeFamilies);
    let defaultAttributeFamily = null;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title="Add Product"
          onBackClick={this.onBackPress}
        ></NavHeader>
        <DivColumn fillParent className={styles.page_container}>
          <InitialPageLoader initialPageApi={getAttributeFamilyAction}>
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
                  <DivColumn className={styles.text_input_container}>
                    {/* <Field name="type">
                      {({ input, meta }) => (
                        <DivColumn className="input_select_container">
                          <Select
                            options={productTypes}
                            onChange={(value) => {
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
                    </Field> */}

                    <Field name="sku">
                      {({ input, meta }) => (
                        <InputTextComponent
                          meta={meta}
                          {...input}
                          placeholder="Item Code"
                          className={styles.input_text}
                        />
                      )}
                    </Field>

                    <Field name="attributeFamily">
                      {({ input, meta }) => (
                        <DivColumn className="input_select_container">
                          <Select
                            options={attributeFamiliesOptions}
                            onChange={(value) => {
                              input.onChange(value.value);
                            }}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            placeholder="Product Vertical"
                            defaultValue={defaultAttributeFamily}
                          />
                          {meta.error && meta.touched && (
                            <span className="error_text">{meta.error}</span>
                          )}
                        </DivColumn>
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
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    createProductAction: bindActionCreators(createProductAction, dispatch),
    getAttributeFamilyAction: bindActionCreators(
      getAttributeFamilyAction,
      dispatch
    ),
    showSuccessFlashMessage: bindActionCreators(
      showSuccessFlashMessage,
      dispatch
    ),
  };
};

export default connect(
  mapStateToProps,
  mapDispathToProps
)(navigatorHoc(AddProduct));
