import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useDropdownClose from "../hooks/useDropdownClose";

const Input = () => {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef();

  useDropdownClose(isActive, setIsActive);

  return (
    <div className="search-wrapper" onClick={() => setIsActive(!isActive)}>
      <div>
        <input
          type="text"
          name="focus"
          required
          className="search-box"
          placeholder="Search by ID, Address, Name...."
        />
        <button className="close-icon" />
      </div>
      {isActive && (
        <div class="dropdown" ref={dropdownRef}>
          <div className="dropdown-item">
            <div className="id">
              <span className="match">{"123"}</span>
              <span className="non-match">{"-s2-546"}</span>
            </div>
            <div className="item">
              <div />
              "bucket" found in Items.
            </div>
            <div className="name">
              <span className="match">{"John "}</span>
              <span className="non-match">{"Jacobs"}</span>
            </div>
            <div className="address">
              <span className="match">{"1st Cross, 9th Main, "}</span>
              <span className="non-match">{`abc Apartment, 2nd Cross, BTI Apartment, 2nd
              Cross, BTI Apartment`}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Input.propTypes = {};

export default Input;
