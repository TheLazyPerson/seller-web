import React, { Component } from "react";
import styles from "./image_selection_component.module.scss";
import DivColumn from "CommonComponents/divColumn";
import translatorHoc from "Hoc/translatorHoc";
import Dropzone from "react-dropzone";
import map from "lodash/map";
import isEmpty from 'lodash/isEmpty';

class ImageSelectionComponent extends Component {
  render() {
    const { onDrop, files } = this.props;

    return (
      <Dropzone onDrop={onDrop} className={styles.dropzone}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.container}>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>
                {map(files, file => {
                  if (isEmpty(file))
                    return null;
                  return (
                    <li>
                      {`${file[0].name} - ${file[0].size} bytes`}
                    </li>
                  )
                })}
              </ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default translatorHoc(ImageSelectionComponent);
