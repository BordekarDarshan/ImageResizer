import React, { Component } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop from "react-image-crop";
export class ImageGeneratorUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crop: {
        unit: "px",
        width: 755,
        height: 450,
      },
      croppedImageUrl: null,
    };
  }
  changeSizeOne = () => {
    let sizeOne = Object.assign({}, this.state.crop);
    sizeOne = {
      ...sizeOne,
      width: 755,
      height: 450,
    };
    console.log(sizeOne);

    this.onCropChange(sizeOne);
    this.onCropComplete(sizeOne);
  };
  changeSizeTwo = () => {
    let sizeTwo = Object.assign({}, this.state.crop);
    sizeTwo = {
      ...sizeTwo,
      width: 365,
      height: 450,
    };
    console.log(sizeTwo);

    this.onCropChange(sizeTwo);
    this.onCropComplete(sizeTwo);
  };
  changeSizeThree = () => {
    let sizeThree = Object.assign({}, this.state.crop);
    sizeThree = {
      ...sizeThree,
      width: 365,
      height: 215,
    };

    this.onCropChange(sizeThree);
    this.onCropComplete(sizeThree);
  };
  changeSizeFour = () => {
    let sizeFour = Object.assign({}, this.state.crop);
    sizeFour = {
      ...sizeFour,
      width: 380,
      height: 380,
    };

    this.onCropChange(sizeFour);
    this.onCropComplete(sizeFour);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
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
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        URL.revokeObjectURL(this.fileUrl);
        // console.log(this.fileUrl)
        // console.log(this)
        this.fileUrl = URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl } = this.state;
    return (
      <div>
        <button
          type="button"
          class="btn btn-dark ml-2 mb-2"
          onClick={this.changeSizeOne}
        >
          Horizontal 755 x 450
        </button>

        <button
          type="button"
          class="btn btn-dark ml-2 mb-2"
          onClick={this.changeSizeTwo}
        >
          Vertical 365 x 450
        </button>
        <button
          type="button"
          class="btn btn-dark ml-2 mb-2"
          onClick={this.changeSizeThree}
        >
          Small 365 x 212
        </button>
        <button
          type="button"
          class="btn btn-dark ml-2 mb-2"
          onClick={this.changeSizeFour}
        >
          Gallery 380 x 380
        </button>

        {this.props.Image && (
          <React.Fragment>
            <div class="mt-3">
              <ReactCrop
                src={this.props.Image}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                className="Preview"
              />
            </div>
            <div class="alert alert-dark d-inline-block mt-4" role="alert">
              Cropped Image
            </div>

            <img
              alt="Crop"
              src={croppedImageUrl}
              className="d-block rounded mb-2"
            />
            <a
              className="btn btn-dark float-right mb-4"
              href={this.state.croppedImageUrl}
              download="image.jpg"
            >
              Download Image Here!!!
            </a>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ImageGeneratorUI;
