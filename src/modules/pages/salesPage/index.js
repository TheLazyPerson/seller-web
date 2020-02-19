import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./sales.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import memoize from "memoize-one";
import DataTableContainer from "CommonContainers/dataTableContainer";

const columns = memoize(() => [
  {
    name: "ID",
    selector: "id",
    sortable: true
  },
  {
    name: "TRANSACTION ID",
    selector: "transaction_id",
    sortable: true
  },
  {
    name: "COMMENT",
    selector: "comment",
    sortable: true,
    grow: 2
  },
  {
    name: "GRAND TOTAL",
    selector: "grand_total",
    sortable: true
  }
]);

class ProductsPage extends Component {
  render() {
    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.sales_page_container}>
          <NavHeader title="Sales"></NavHeader>

          <DivColumn fillParent className={styles.content_container}>
            <DataTableContainer title="Transactions" columns={columns()} />
          </DivColumn>
        </DivColumn>
      </SectionedContainer>
    );
  }
}

const mapDispathToProps = dispatch => {
  return {
    logoutAction: bindActionCreators(logoutAction, dispatch)
  };
};

export default connect(null, mapDispathToProps)(navigatorHoc(ProductsPage));
