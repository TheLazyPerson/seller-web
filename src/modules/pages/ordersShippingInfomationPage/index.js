import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import styles from "./orders_shipping.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DataTable from "react-data-table-component";
import { showSuccessFlashMessage } from "Redux/actions/flashMessageActions";

import {
  getOrderDetailsAction,
  createPickupRequestAction,
} from "Core/modules/order/orderActions";
import InitialPageLoader from "CommonContainers/initialPageLoader";
import HorizontalBorder from "CommonComponents/horizontalBorder";
import { Form, Field } from "react-final-form";
import InputTextComponent from "CommonComponents/InputTextComponent";
import { isEmptyValidator } from "Utils/validators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import isEmpty from "lodash/isEmpty";
import { formatUnixTimeStampToDateTime } from "Utils/formatHelper";
import translatorHoc from "Hoc/translatorHoc";

class OrderShippingInformationPage extends Component {
  state = {
    startDate: null,
  };

  onBackPress = () => {
    const { pop } = this.props;
    pop();
  };

  validate = (values) => {
    const errors = {};
    const validators = {
      pickupDate: isEmptyValidator(values.pickupDate),
    };

    Object.keys(validators).forEach((key) => {
      if (!validators[key].result) errors[key] = validators[key].error;
    });

    return errors;
  };

  onSubmit = (form) => {
    const {
      createPickupRequestAction,
      navigateTo,
      match: { params },
      showSuccessFlashMessage,
    } = this.props;
    createPickupRequestAction(params.orderId, {
      pickup_date: form.pickupDate,
    }).then(({ payload }) => {
      if (payload.code === 200 || payload.code === 201) {
        navigateTo("order-details", { orderId: params.orderId });
        showSuccessFlashMessage("Pickup Request Created successfuly");
      }
    });
  };

  render() {
    const rowStyle = {
      fontSize: 12,
      color: "#19202c",
    };
    const {
      orderReducer: { order },
      match: { params },
      getOrderDetailsAction,
      translate,
      isRTL,
      languageReducer: { languageCode },
    } = this.props;

    const columns = [
      {
        name: `${translate("create_pickup_request.table.item_code")}`,
        selector: "sku",
        style: rowStyle,
      },
      {
        name: `${translate("create_pickup_request.table.name")}`,
        selector: "name",
        style: rowStyle,
        cell: (value) => value.product.translations[languageCode].name,
      },
      {
        name: `${translate("create_pickup_request.table.exhibition_name")}`,
        selector: "exhibition.title",
        grow: 2,
        style: rowStyle,
        cell: (value) => value.exhibition.translations[languageCode].title,
      },
      {
        name: `${translate("create_pickup_request.table.quantity")}`,
        selector: "qty_ordered",
        style: rowStyle,
      },
      {
        name: `${translate("create_pickup_request.table.quantity_to_ship")}`,
        selector: "qty_ordered",
        style: rowStyle,
      },
    ];

    const customStyles = {
      headRow: {
        style: {
          borderTop: "1px solid #ededed",
          borderBottom: "1px solid #ededed",
          backgroundColor: "#f4f7fa",
        },
      },
      headCells: {
        style: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#7c858e",
        },
      },
    };
    let startDate = null;
    if (this.state.startDate) {
      startDate = this.state.startDate;
    }

    const CustomRenderInput = ({ input, value, onClick, meta }) => {
      return (
        <InputTextComponent
          {...input}
          meta={meta}
          placeholder={translate("create_pickup_request.select_pickup_date")}
          value={value}
          className={styles.input_text}
          onClick={onClick}
        />
      );
    };

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <NavHeader
          title={translate("create_pickup_request.title")}
          onBackClick={this.onBackPress}
        ></NavHeader>
        <InitialPageLoader
          initialPageApi={() => getOrderDetailsAction(params.orderId)}
        >
          <div
            className={` ${styles.order_page_container} ${
              isRTL ? styles.rtl : ""
            }`}
          >
            <DivColumn className={styles.order_container}>
              <div className={styles.order_id}>
                {translate("create_pickup_request.order_id")} {isRTL ? ":" : ""}
                <b>{order.id}</b> {!isRTL ? ":" : ""}
              </div>
              <div className={styles.placed_on}>
                {translate("create_pickup_request.places_on")}
                {isRTL ? ":" : ""}{" "}
                {formatUnixTimeStampToDateTime(order.created_at)}
                {!isRTL ? ":" : ""}
              </div>
              <div className={styles.status}>
                {" "}
                {translate("order_list.table." + order.status)}
              </div>
            </DivColumn>

            <div className={styles.header}>
              {" "}
              {translate("create_pickup_request.form_title")}
            </div>
            <div className={styles.form_wrapper}>
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
                  <form
                    className={styles.form_container}
                    onSubmit={handleSubmit}
                  >
                    <Field name="pickupDate">
                      {({ input, meta }) => (
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          onChange={(date) => {
                            this.setState({ startDate: date });
                            input.onChange(date);
                          }}
                          minDate={new Date()}
                          customInput={
                            <CustomRenderInput meta={meta} input={input} />
                          }
                        />
                      )}
                    </Field>
                    <DivRow className={styles.form_button_container}>
                      <CapsuleButton type="submit" disabled={submitting}>
                        {translate("create_pickup_request.create_request")}
                      </CapsuleButton>
                    </DivRow>
                  </form>
                )}
              />
            </div>
            <div className={styles.header}>
              {translate("create_pickup_request.customer_details")}
            </div>
            <DivColumn className={styles.normal_container}>
              <DivRow className={styles.title}>
                {isRTL ? ":" : ""}
                {translate("create_pickup_request.name")}
                {!isRTL ? ":" : ""}

                <div className={styles.value}>
                  {order.customer_first_name} {order.customer_last_name}
                </div>
              </DivRow>
              <DivRow className={styles.title}>
                {isRTL ? ":" : ""}

                {translate("create_pickup_request.email")}
                {!isRTL ? ":" : ""}
                <div className={styles.value}>{order.customer_email}</div>
              </DivRow>
            </DivColumn>
            <div className={styles.header}>
              {translate("create_pickup_request.product_list")}
            </div>
            <div className={styles.datatable_container}>
              <DataTable
                columns={columns}
                customStyles={customStyles}
                data={order.items}
                style={{ minHeight: 200 }}
                noHeader={true}
                direction={isRTL ? "rtl" : "ltr"}
              />
            </div>
            <HorizontalBorder />
            <DivRow className={styles.address_container}>
              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("create_pickup_request.shipping_address")}
                </div>
                <div className={styles.description}>
                  {!isEmpty(order.shipping_address) && (
                    <span>
                      {order.shipping_address.area},{" "}
                      {order.shipping_address.block_number},{" "}
                      {order.shipping_address.house_number},{" "}
                      {order.shipping_address.street_number},{" "}
                      {order.shipping_address.avenue} ,{" "}
                      {order.shipping_address.landmark}-{" "}
                      {order.shipping_address.city}
                    </span>
                  )}
                </div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("create_pickup_request.billing_address")}
                </div>
                <div className={styles.description}>
                  {!isEmpty(order.billing_address) && (
                    <span>
                      {order.shipping_address.area},{" "}
                      {order.shipping_address.block_number},{" "}
                      {order.shipping_address.house_number},{" "}
                      {order.shipping_address.street_number},{" "}
                      {order.shipping_address.avenue} ,{" "}
                      {order.shipping_address.landmark}-{" "}
                      {order.shipping_address.city}
                    </span>
                  )}
                </div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("create_pickup_request.shipping_methods")}
                </div>
                <div className={styles.description}>{order.shipping_title}</div>
              </DivColumn>

              <DivColumn className={styles.address_item_container}>
                <div className={styles.title}>
                  {translate("create_pickup_request.payment_method")}
                </div>
                <div className={styles.description}>{order.payment_title}</div>
              </DivColumn>
            </DivRow>
          </div>
        </InitialPageLoader>
      </SectionedContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderReducer: state.orderReducer,
    isRTL: state.languageReducer.isRTL,
    languageReducer: state.languageReducer,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    getOrderDetailsAction: bindActionCreators(getOrderDetailsAction, dispatch),
    createPickupRequestAction: bindActionCreators(
      createPickupRequestAction,
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
)(navigatorHoc(translatorHoc(OrderShippingInformationPage)));
