import React, { Component } from "react";
import PropTypes from "prop-types";
import infiniteLoader from "Icons/circular-loader.gif";
import DivColumn from "CommonComponents/divColumn";
import { isTypeSuccess } from "Core/utils/validationHelper";
import styles from "./initial_page_loader.module.scss";
import CapsuleButton from "CommonComponents/capsuleButton";

class InitialPageLoader extends Component {
  state = {
    loading: false,
    isError: false,
    isComponentReady: false,
  };

  componentDidMount() {
    const { callApiOnMount } = this.props;
    if (callApiOnMount) this.makePageApiCall();

    this.setState({ isComponentReady: true }); //Had to do it for now
  }

  reload = () => {
    this.makePageApiCall();
  };

  makePageApiCall = () => {
    const { initialPageApi } = this.props;
    this.setState({ loading: true, isError: false });

    initialPageApi()
      .then((data) => {
        if (isTypeSuccess(data.type)) this.setState({ loading: false });
        else this.setState({ loading: false, isError: true });
      })
      .catch((error) => {
        console.log("initialPageLoader Error:", error);
        this.setState({ loading: false, isError: true });
      });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loaderScreen = () => {
    return (
      <DivColumn fillParent verticalCenter horizontalCenter>
        <img src={infiniteLoader} className={styles.loader} alt="Loading ..." />
      </DivColumn>
    );
  };

  emptyScreen = () => {
    const { emptyScreenMessage, emptyScreenTitle } = this.props;

    return (
      <DivColumn
        fillParent
        verticalCenter
        horizontalCenter
        className={styles.error_container}
      >
        <div className={styles.error_title_text}>{emptyScreenTitle}</div>
        <div className={styles.error_message_text}>{emptyScreenMessage}</div>
      </DivColumn>
    );
  };

  render() {
    const {
      children,
      className,
      errorMessage,
      customLoader,
      headingErrorMessage,
      customEmptyScreen,
      isEmpty,
    } = this.props;

    const { loading, isError, isComponentReady } = this.state;

    return (
      <DivColumn fillParent className={`${className}`}>
        {isComponentReady &&
          (isError ? (
            <DivColumn
              fillParent
              verticalCenter
              horizontalCenter
              className={styles.error_container}
            >
              <div className={styles.error_title_text}>
                {headingErrorMessage}
              </div>
              <div className={styles.error_message_text}>{errorMessage}</div>
              <br />
              <CapsuleButton onClick={this.makePageApiCall}>
                Retry
              </CapsuleButton>
            </DivColumn>
          ) : loading ? (
            customLoader ? (
              customLoader
            ) : (
              this.loaderScreen()
            )
          ) : isEmpty ? (
            customEmptyScreen ? (
              customEmptyScreen
            ) : (
              this.emptyScreen()
            )
          ) : (
            children
          ))}
      </DivColumn>
    );
  }
}

InitialPageLoader.defaultProps = {
  showEmptyScreen: false,
  headingErrorMessage: "Whoops! Something Went Wrong.",
  errorMessage: "There was a problem with your action.",
  emptyMessage: "Looks like its empty",
  callApiOnMount: true,

  customEmptyScreen: null,
  isEmpty: false,

  emptyScreenTitle: "No Result",
  emptyScreenMessage: "Looks like its Empty",
};

InitialPageLoader.propTypes = {
  children: PropTypes.any.isRequired, //(Mandetory) the children to show after the api call
  initialPageApi: PropTypes.func.isRequired, //(Mandetory) the promise in which the api call is being made
  childrenItems: PropTypes.any, //(Optional) ... To handle empty screens if there are no items
  errorMessage: PropTypes.string, //(Optional) Error message in case required differntly on different screens
  emptyMessage: PropTypes.string, //(Optional) Empty message in case required differntly on different screens
  customLoader: PropTypes.any, //(Optional) Component to show instead of the default laoder
  callApiOnMount: PropTypes.bool, //(Optional) Don't automatically want to call the api on mount, instead
  //handle it manually using ref and calling the reload method

  customEmptyScreen: PropTypes.any,
  //customErrorScreen: PropTypes.any,

  //Style
  className: PropTypes.any,
};

export default InitialPageLoader;
