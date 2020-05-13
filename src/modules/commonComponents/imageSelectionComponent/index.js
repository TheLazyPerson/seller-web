import React, { Component, createRef } from "react";
import styles from "./image_selection_component.module.scss";
import DivColumn from "CommonComponents/divColumn";
import DivRow from "CommonComponents/divRow";
import translatorHoc from "Hoc/translatorHoc";
import Dropzone from "react-dropzone";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import CapsuleButton from "CommonComponents/capsuleButton";

class ImageSelectionComponent extends Component {
  render() {
    const { onDrop, files, uploadedFiles } = this.props;

    return (
      <Dropzone onDrop={onDrop} accept={"image/*"} className={styles.dropzone}>
        {({ getRootProps, getInputProps }) => (
          <section className={styles.container}>
            <div {...getRootProps({ className: "dropzone" })}>
              <aside className={styles.inner_dropzone_container}>
                <h4>Images</h4>
                <DivRow className={styles.image_container}>
                  {map(uploadedFiles, (file) => {
                    if (isEmpty(file)) return null;
                    return (
                      <DivColumn className={styles.image_contain}>
                        <img src={file.path} className={styles.image} />
                      </DivColumn>
                    );
                  })}
                </DivRow>
                <DivRow>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </DivRow>
              </aside>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default translatorHoc(ImageSelectionComponent);
