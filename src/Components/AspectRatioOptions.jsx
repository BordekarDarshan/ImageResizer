import React from "react";

function AspectRatioOptions({ changeSizeOne }) {
  return (
    <div>
      <button
        type="button"
        class="btn btn-dark m-2"
        onClick={() => {
          changeSizeOne(755, 450);
        }}
      >
        Horizontal 755 x 450
      </button>

      <button
        type="button"
        class="btn btn-dark m-2"
        onClick={() => {
          changeSizeOne(365, 450);
        }}
      >
        Vertical 365 x 450
      </button>
      <button
        type="button"
        class="btn btn-dark m-2"
        onClick={() => {
          changeSizeOne(365, 212);
        }}
      >
        Small 365 x 212
      </button>
      <button
        type="button"
        class="btn btn-dark m-2"
        onClick={() => {
          changeSizeOne(380, 380);
        }}
      >
        Gallery 380 x 380
      </button>
    </div>
  );
}

export default AspectRatioOptions;
