import React, { Component } from "react";
import SectionedContainer from "CommonContainers/sectionedContainer";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import NavHeader from "CommonComponents/navHeader";
import CapsuleButton from "CommonComponents/capsuleButton";
import map from "lodash/map";
import styles from "./orders.module.scss";
import SideNav from "CommonComponents/sideNav";
import navigatorHoc from "Hoc/navigatorHoc";
import { logoutAction } from "Core/modules/signin/signinActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CookieService } from "Utils/cookieService";
import { USER_DATA_COOKIE } from "Constants/cookieConstants";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

class OrdersPage extends Component {
  state = {
    rows: [
      {
        id: 20,
        order_date: "16 Nov 2020",
        exhibtion_name: "Sample Name",
        grand_total: "KD 76 ",
        total_items: "7",
        status: "Pending"
      },
      {
        id: 20,
        order_date: "16 Nov 2020",
        exhibtion_name: "Sample Name",
        grand_total: "KD 76 ",
        total_items: "7",
        status: "Pending"
      }
    ]
  };

  render() {
    const { rows } = this.state;

    return (
      <SectionedContainer sideBarContainer={<SideNav />}>
        <DivColumn fillParent className={styles.orders_page_container}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      // indeterminate={numSelected > 0 && numSelected < rowCount}
                      // checked={rowCount > 0 && numSelected === rowCount}
                      // onChange={onSelectAllClick}
                      // inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>ORDER DATE</TableCell>
                  <TableCell >EXHIBITION NAME</TableCell>
                  <TableCell>GRAND TOTAL</TableCell>
                  <TableCell >TOTAL ITEMS</TableCell>
                  <TableCell >STATUS</TableCell>
                  <TableCell >ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell> <Checkbox /> </TableCell>
                    <TableCell >{row.id}</TableCell>
                    <TableCell >{row.order_date}</TableCell>
                    <TableCell >
                      {row.exhibtion_name}
                    </TableCell>
                    <TableCell >{row.grand_total}</TableCell>
                    <TableCell >{row.total_items}</TableCell>
                    <TableCell >{row.status}</TableCell>
                    <TableCell ></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

export default connect(
  null,
  mapDispathToProps
)(navigatorHoc(OrdersPage));
