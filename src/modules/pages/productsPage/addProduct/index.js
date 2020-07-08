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
import translatorHoc from "Hoc/translatorHoc";
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
    const {
      onClickCancel,
      basicReducer: { attributeFamilies },
      getAttributeFamilyAction,
      translate,
      isRTL,
      languageReducer: { languageCode },
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
          title={translate("add_product.title")}
          onBackClick={this.onBackPress}
        ></NavHeader>
        <DivColumn
          fillParent
          className={` ${styles.page_container} ${isRTL ? styles.rtl : ""}`}
        >
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
                    <Field name="sku">
                      {({ input, meta }) => (
                        <InputTextComponent
                          meta={meta}
                          {...input}
                          placeholder={translate("add_product.sku")}
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
                            placeholder={translate(
                              "add_product.product_vertical"
                            )}
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
                      {translate("add_product.cancel")}
                    </SecondaryCapsuleButton>
                    <CapsuleButton type="submit" disabled={submitting}>
                      {translate("add_product.save")}
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
    languageReducer: state.languageReducer,
    isRTL: state.languageReducer.isRTL,
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
)(navigatorHoc(translatorHoc(AddProduct)));
