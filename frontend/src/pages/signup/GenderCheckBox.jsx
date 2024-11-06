import React from "react";

const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          htmlFor=""
          className={`label gap-2 cursor-pointer ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            name="gen"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
            id=""
          />
        </label>
      </div>
      <div className="form-control">
        <label
          htmlFor=""
          className={`label gap-2 cursor-pointer ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            name="gen"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
            id=""
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
