import React, { Component } from "react";
import styles from "./input_checkbox_tree.module.scss";
import DivRow from "CommonComponents/divRow";
import translatorHoc from "Hoc/translatorHoc";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import map from "lodash/map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
//TODO: replace icons with font awesome icons
class InputCheckboxTreeComponent extends Component {
  state = {
    checked: this.props.selectedCategories,
    expanded: [],
  };

  formatSelectorData = (array) => {
    return array.map(({ id, name, children }) =>
      Object.assign(
        { value: id, label: name },
        children.length > 0 && { children: this.formatSelectorData(children) }
      )
    );
  };

  onChecked = (checked) => {
    this.setState(
      {
        checked,
      },
      () => {
        this.props.onSelectCategory(this.state.checked);
      }
    );
  };

  render() {
    const { data } = this.props;
    const nodes = this.formatSelectorData(data);

    return (
      <CheckboxTree
        nodes={nodes}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={(checked) => this.onChecked(checked)}
        onExpand={(expanded) => this.setState({ expanded })}
        expandOnClick={true}
        noCascade={true}
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
