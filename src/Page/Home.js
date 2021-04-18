import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "./Home.css";
import "react-image-crop/dist/ReactCrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faArrowCircleDown,
} from "@fortawesome/fontawesome-free-solid";

class Home extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: 16 / 9,
    },
  };

  onSelectFile = (e) => {
    let { files } = e.target;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <>
        <div>
          <label htmlFor="file-upload" className="custom-file-upload">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={this.onSelectFile}
            />
            <FontAwesomeIcon icon={faPlusCircle} />
            Upload
          </label>
        </div>
        <div className="image-container">
          <div className="selected-image-container">
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
          </div>
          <div className="cropped-image-container">
            {croppedImageUrl && (
              <>
                <img
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={croppedImageUrl}
                />
                <a href={croppedImageUrl} download class="custom-file-upload">
                  <FontAwesomeIcon icon={faArrowCircleDown} />
                  Download
                </a>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Home;
