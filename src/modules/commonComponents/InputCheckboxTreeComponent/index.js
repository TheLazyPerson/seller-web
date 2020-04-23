import React, { Component } from "react";
import styles from "./input_checkbox_tree.module.scss";
import DivRow from "CommonComponents/divRow";
import translatorHoc from "Hoc/translatorHoc";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import map from "lodash/map";

import {
  CheckBoxOutlineBlankOutlined,
  DescriptionOutlined,
  CheckBoxOutlined,
  FolderOutlined,
  FolderOpenOutlined,
  CheckOutlined,
  AddOutlined,
  RemoveOutlined,
  ChevronRightOutlined,
  KeyboardArrowDownOutlined,
} from "@material-ui/icons";

class InputCheckboxTreeComponent extends Component {
  state = {
    checked: [],
    expanded: [],
  };

  formatSelectorData = (list) => {
    return map(list, (item) => ({
      value: item.id,
      label: item.name,
    }));
  };
  render() {
    const { data } = this.props;
    return (
      <CheckboxTree
        nodes={this.formatSelectorData(data)}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={(checked) => this.setState({ checked })}
        onExpand={(expanded) => this.setState({ expanded })}
        showExpandAll={true}
        expandOnClick={true}
        icons={{
          check: <CheckBoxOutlined classes={styles.color_primary} />,
          uncheck: (
            <CheckBoxOutlineBlankOutlined classes={styles.color_primary} />
          ),
          halfCheck: <CheckOutlined classes={styles.color_primary} />,
          expandClose: <ChevronRightOutlined classes={styles.color_primary} />,
          expandOpen: (
            <KeyboardArrowDownOutlined classes={styles.color_primary} />
          ),
          expandAll: <AddOutlined classes={styles.color_primary} />,
          collapseAll: <RemoveOutlined classes={styles.color_primary} />,
          parentClose: <FolderOutlined classes={styles.fill_primary} />,
          parentOpen: <FolderOpenOutlined classes={styles.fill_primary} />,
          leaf: <DescriptionOutlined classes={styles.fill_primary} />,
        }}
      />
    );
  }
}

export default translatorHoc(InputCheckboxTreeComponent);
