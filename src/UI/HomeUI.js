import React, { useState } from "react";
import ImageGeneratorUI from "./ImageGeneratorUI";
import Logo from "../Uploads/Logo.png";
function HomeUI() {
  let [Profile, setProfile] = useState(null);

  function UploadImage(e) {
    let reader = new FileReader();
    try {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        //Initiate the JavaScript Image object.
        let image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          return setProfile(image.src);
        };
      };
    } catch (error) {
      console.log("Try Reloading Page");
    }
  }

  return (
    <React.Fragment>
      <nav class="navbar bg-dark">
        <span class="navbar-brand mb-0 h1 text-white">Crop!!!!</span>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 mt-4">
            <h4 className="d-block headerChoose">Choose File</h4>
            <input
              type="file"
              id="file"
              className="hidden"
              accept="image/*"
              onChange={UploadImage}
              multiple={false}
            />
            <label htmlFor="file" className="btn btn-dark btnFont">
              Choose File
            </label>
          </div>
          {/* {console.log(Profile)} */}
        </div>

        {Profile && <ImageGeneratorUI Image={Profile}></ImageGeneratorUI>}
      </div>
      <img className="fixed-bottom float-right" src={Logo} alt="Crop"></img>
    </React.Fragment>
  );
}

export default HomeUI;
