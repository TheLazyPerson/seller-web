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
import { uploadImage } from "Core/modules/product/productActions";
import { isEmptyValidator, isEmptyArrayValidator } from "Utils/validators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import { editProductAction } from "Core/modules/product/productActions";
import { getProductFormAction } from "Core/modules/product/productActions";
import ImageSelectionComponent from "CommonComponents/imageSelectionComponent";
import { getBase64 } from "Utils/generalUtils";
import { getCategoryTreeAction } from "Core/modules/category/categoryActions";

import map from "lodash/map";
import isEmpty from "lodash/isEmpty";

import Select from "react-select";

class EditProduct extends Component {
  state = {
    productImages: [],
    productImagesObj: [],
    productImagesPayload: [],
    selectedCategories: [],
    productIntitalValues: {},
    firstTime: true,
  };

  componentDidMount() {
    const {
      editProductAction,
      productReducer: { prouctForm, editProduct },
      match: { params },
    } = this.props;

    editProductAction({ id: params.productId }).then(({ payload }) => {
      const categoryPayload = payload.data.product["category"].map(
        (category) => {
          return category.id.toString();
        }
      );
      this.setState({
        selectedCategories: categoryPayload,
      });
      this.setState({
        productImagesPayload: payload.data.product["image"],
      });
    });
  }

  onSubmitComplete = () => {
    const { navigateTo } = this.props;
    navigateTo("products");
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  onSelectCategory = (data) => {
    this.setState({
      selectedCategories: data,
    });
  };

  validate = (values) => {
    const {
      productReducer: { prouctForm },
    } = this.props;

    const errors = {};

    const reduced = prouctForm.reduce((prev, element) => {
      element.attributes.forEach((attribute) => {
        const { type, slug, name, is_translatable } = attribute;
        const validatorResponse =
          type == "file" || type == "tree-checkbox"
            ? { result: true }
            : isEmptyValidator(values[attribute.slug]);
        prev[attribute.slug] = validatorResponse;
        if (is_translatable === 1) {
          const validatorForTranslatableResponse =
            type == "file" || type == "tree-checkbox"
              ? { result: true }
              : isEmptyValidator(values[attribute.slug.concat("_ar")]);
          prev[attribute.slug.concat("_ar")] = validatorForTranslatableResponse;
        }
      });
      return prev;
    }, {});

    Object.keys(reduced).forEach((key) => {
      if (!reduced[key].result) errors[key] = reduced[key].error;
    });
    return errors;
  };

  onSubmit = (form) => {
    const {
      editProductAction,
      showSuccessFlashMessage,
      onSubmitComplete,
      productReducer: { prouctForm },
      match: { params },
    } = this.props;

    const formData = prouctForm.reduce(
      (prev, element) => {
        element.attributes.forEach((attribute) => {
          if (attribute.slug === "category") {
            prev[attribute.slug] = this.state.selectedCategories;
          } else if (attribute.slug === "image") {
            prev[attribute.slug] = this.state.productImagesObj;
          } else {
            if (attribute.is_translatable === 1) {
              prev[attribute.slug] = {
                ar: form[attribute.slug.concat("_ar")],
                en: form[attribute.slug],
              };
            } else {
              prev[attribute.slug] = form[attribute.slug];
            }
          }
        });
        return prev;
      },
      { id: params.productId }
    );

    editProductAction(formData).then(({ payload }) => {
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

  setUpdatedImages = (file, id, data) => {
    const {
      productImages,
      productImagesPayload,
      productImagesObj,
    } = this.state;
    this.setState({
      productImages: [...productImages, file],
      productImagesObj: [...productImagesObj, id],
      productImagesPayload: [...productImagesPayload, data],
    });
  };

  getFormItem = (attribute) => {
    const { type, slug, name, is_translatable } = attribute;

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

          {is_translatable === 1 && (
            <Field name={slug.concat("_ar")}>
              {({ input, meta }) => (
                <InputTextComponent
                  meta={meta}
                  {...input}
                  placeholder={name.concat(" - Arabic")}
                  className={styles.input_text}
                />
              )}
            </Field>
          )}
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

          {is_translatable === 1 && (
            <Field name={slug.concat("_ar")}>
              {({ input, meta }) => (
                <InputTextareaComponent
                  meta={meta}
                  {...input}
                  placeholder={name.concat(" - Arabic")}
                  className={styles.input_text_area}
                />
              )}
            </Field>
          )}
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
      const { productImages, productImagesPayload } = this.state;

      return (
        <DivColumn className={styles.text_file_container}>
          <Field name={slug}>
            {({ input, meta }) => (
              <ImageSelectionComponent
                files={productImages}
                uploadedFiles={productImagesPayload}
                onDrop={(file) => {
                  this.uploadImage(file).then(({ payload }) => {
                    this.setUpdatedImages(file, payload.data.id, payload.data);
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
                <InputCheckboxTreeComponent
                  data={categories.categories}
                  onSelectCategory={this.onSelectCategory}
                  selectedCategories={this.state.selectedCategories}
                />
              )}
            </Field>
          </DivColumn>
        </InitialPageLoader>
      );
    }
  };

  getInitialValuesFromProduct = (productForm) => {
    const {
      productReducer: { editProduct },
    } = this.props;
    if (isEmpty(editProduct)) {
      return {};
    }
    const formData = productForm.reduce((prev, element) => {
      element.attributes.forEach((attribute) => {
        if (attribute.slug !== "category" && attribute.slug !== "image") {
          if (attribute.is_translatable === 1) {
            prev[attribute.slug.concat("_ar")] =
              editProduct.product[attribute.slug].ar;
            prev[attribute.slug] = editProduct.product[attribute.slug].en;
          } else {
            prev[attribute.slug] = editProduct.product[attribute.slug];
          }
        }
      });
      return prev;
    }, {});
    return formData;
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
            {!isEmpty(prouctForm) && (
              <Form
                onSubmit={this.onSubmit}
                validate={this.validate}
                initialValues={this.getInitialValuesFromProduct(prouctForm)}
                render={({
                  handleSubmit,
                  form,
                  submitting,
                  pristine,
                  values,
                }) => (
                  <form
                    className={styles.form_container}
                    onSubmit={handleSubmit}
                  >
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
            )}
            ;
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
    editProductAction: bindActionCreators(editProductAction, dispatch),
    getProductFormAction: bindActionCreators(getProductFormAction, dispatch),
    getCategoryTreeAction: bindActionCreators(getCategoryTreeAction, dispatch),
    uploadImage: bindActionCreators(uploadImage, dispatch),
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
