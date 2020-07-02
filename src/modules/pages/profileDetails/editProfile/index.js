import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivRow from "CommonComponents/divRow";
import SideNav from "CommonComponents/sideNav";
import styles from "./edit_profile.module.scss";
import NavHeader from "CommonComponents/navHeader";
import { Form, Field } from "react-final-form";
import CapsuleButton from "CommonComponents/capsuleButton";
import SecondaryCapsuleButton from "CommonComponents/secondaryCapsuleButton";
import InputTextComponent from "CommonComponents/InputTextComponent";
import navigatorHoc from "Hoc/navigatorHoc";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";
import {
  getProfileDetailsAction,
  editProfileDetailsAction,
} from "Core/modules/profiledetails/profileDetailsActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  isPhoneNumber,
  nameValidator,
  isEmptyValidator,
  emailValidator,
} from "Utils/validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import DivColumn from "CommonComponents/divColumn";
import translatorHoc from "Hoc/translatorHoc";

class EditProfile extends Component {
  state = {
    startDate: null,
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  onSubmit = (form) => {
    const {
      editProfileDetailsAction,
      navigateTo,
      showSuccessFlashMessage,
    } = this.props;

    editProfileDetailsAction({
      first_name: form.firstName,
      last_name: form.lastName,
      gender: form.gender,
      phone: form.mobileNumber,
      email: form.email,
      birthday: form.birthday,
      civil_id: form.civilId,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("profile-details");
        showSuccessFlashMessage("Profile Updated");
      }
    });
  };

  componentDidMount() {
    // TODO: To add to check if reducer data is not available.
    // this.props.getProfileDetailsAction().then(({ payload }) => {
    //   if (payload.code === 200 || payload.code === 201) {
    //     // code here
    //   }
    // });
  }

  validate = (values) => {
    const errors = {};
    const validators = {
      firstName: nameValidator(values.firstName),
      lastName: nameValidator(values.lastName),
      email: emailValidator(values.email),
      civilId: isEmptyValidator(values.civilId),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onClickCancel = () => {
    this.onBackPress();
  };

  render() {
    const {
      profileDetailsReducer: { userDetails },
      translate,
      isRTL,
    } = this.props;
    let startDate = null;

    if (this.state.startDate) {
      startDate = this.state.startDate;
    } else if (userDetails.birthday) {
      startDate = new Date(userDetails.birthday);
    }

    const genderOptions = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ];
    let defaultGender = null;

    if (userDetails.gender) {
      if (userDetails.gender == "male") defaultGender = genderOptions[0];
      else defaultGender = genderOptions[1];
    }

    const CustomRenderInput = ({ input, value, onClick, meta }) => {
      return (
        <InputTextComponent
          {...input}
          meta={meta}
          placeholder={translate("edit_profile.birthday")}
          value={value}
          className={styles.input_text}
          onClick={onClick}
        />
      );
    };

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("edit_profile.title")}
          onBackClick={this.onBackPress}
        />
        <DivRow className={` ${isRTL ? styles.rtl : ""}`}>
          <Form
            onSubmit={this.onSubmit}
            validate={this.validate}
            initialValues={{
              firstName: userDetails.first_name ? userDetails.first_name : "",
              lastName: userDetails.last_name ? userDetails.last_name : "",
              gender: userDetails.gender ? userDetails.gender : "",
              mobileNumber: userDetails.phone ? userDetails.phone : "",
              email: userDetails.email ? userDetails.email : "",
              civilId: userDetails.civil_id ? userDetails.civil_id : "",
              birthday: userDetails.birthday ? userDetails.birthday : "",
            }}
            render={({
              handleSubmit,
              form: {
                mutators: { mutateValue },
              },
              submitting,
              pristine,
              values,
            }) => (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <Field name="firstName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate("edit_profile.first_name")}
                      className={styles.input_text}
                    />
                  )}
                </Field>
                <Field name="lastName">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate("edit_profile.last_name")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="gender">
                  {({ input, meta }) => (
                    <DivColumn className="input_select_container">
                      <Select
                        options={genderOptions}
                        onChange={(value) => {
                          input.onChange(value.value);
                        }}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        placeholder={translate("edit_profile.gender")}
                        defaultValue={defaultGender}
                      />
                      {meta.error && meta.touched && (
                        <span className="error_text">{meta.error}</span>
                      )}
                    </DivColumn>
                  )}
                </Field>

                <Field name="mobileNumber">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate("edit_profile.mobile_number")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="email">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate("edit_profile.email")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="civilId">
                  {({ input, meta }) => (
                    <InputTextComponent
                      meta={meta}
                      {...input}
                      placeholder={translate("edit_profile.civil_id")}
                      className={styles.input_text}
                    />
                  )}
                </Field>

                <Field name="birthday">
                  {({ input, meta }) => (
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        this.setState({ startDate: date });
                        input.onChange(date.valueOf());
                      }}
                      maxDate={new Date()}
                      customInput={
                        <CustomRenderInput meta={meta} input={input} />
                      }
                    />
                  )}
                </Field>

                <DivRow className={styles.form_button_container}>
                  <SecondaryCapsuleButton onClick={this.onClickCancel}>
                    {translate("edit_profile.cancel")}
                  </SecondaryCapsuleButton>
                  <CapsuleButton type="submit" disabled={submitting}>
                    {translate("edit_profile.save_details")}
                  </CapsuleButton>
                </DivRow>
              </form>
            )}
          />
        </DivRow>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileDetailsReducer: state.profileDetailsReducer,
    isRTL: state.languageReducer.isRTL,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getProfileDetailsAction: bindActionCreators(
      getProfileDetailsAction,
      dispatch
    ),
    editProfileDetailsAction: bindActionCreators(
      editProfileDetailsAction,
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
)(navigatorHoc(translatorHoc(EditProfile)));
