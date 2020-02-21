import React, { Component } from "react";
import styles from "./image_selection_component.module.scss";
import DivColumn from "CommonComponents/divColumn";
import translatorHoc from "Hoc/translatorHoc";
import Dropzone from "react-dropzone";
import map from "lodash/map";

class ImageSelectionComponent extends Component {
  constructor() {
    super();
    this.onDrop = files => {
      this.setState({ files });
    };
    this.state = {
      files: []
    };
  }

  render() {
    const files = this.state.files;

    return (
      <Dropzone onDrop={this.onDrop} className={styles.dropzone}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.container}>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>
                {map(file => (
                  <li key={file.name}>
                    {file.name} - {file.size} bytes
                  </li>
                ))}
              </ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default translatorHoc(ImageSelectionComponent);
