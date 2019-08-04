import React, { useState, useRef, useEffect } from "react";
import useDropdownClose from "../hooks/useDropdownClose";
import useSearch from "../hooks/useSearch";

const Input = () => {
  const [isActive, setIsActive] = useState(false);
  const [focusIndex, setFocusIndex] = useState(null);
  const dropdownRef = useRef();

  useDropdownClose(isActive, setIsActive);

  const { data = [], searchString, setSearchString } = useSearch();

  const highlighter = (item, searchStrig) => (
    <span
      className="non-match"
      dangerouslySetInnerHTML={{
        __html: item.replace(
          new RegExp(searchString ? searchString : " ", "gi"),
          match => `<span class="match">${match}</span>`
        )
      }}
    />
  );

  const handleNavigation = e => {
    if (e.keyCode === 40) {
      setFocusIndex(index =>
        index === null || index === data.length - 1 ? 0 : index + 1
      );
    }

    if (e.keyCode === 38) {
      setFocusIndex(index =>
        index === null || index === 0 ? data.length - 1 : index - 1
      );
    }
  };

  useEffect(() => {
    console.log(focusIndex);
  }, [focusIndex]);

  console.log(data);
  return (
    <div className="search-wrapper" onClick={() => setIsActive(!isActive)}>
      <div>
        <input
          type="text"
          name="focus"
          required
          className="search-box"
          placeholder="Search by ID, Address, Name...."
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
          onKeyDown={handleNavigation}
        />
        <button className="close-icon" onClick={() => setSearchString("")} />
      </div>
      {isActive && (
        <div className="dropdown" ref={dropdownRef}>
          {data.length > 0 ? (
            data.map((d, i) => (
              <div
                key={`data.id_${String(i)}`}
                className={`dropdown-item ${i === focusIndex ? "focused" : ""}`}
                onMouseEnter={() => setFocusIndex(i)}
              >
                <div className="id">{highlighter(d.id, searchString)}</div>
                {d.items.includes(searchString) && (
                  <div className="item">
                    <div />"{searchString}" found in Items.
                  </div>
                )}
                <div className="name">
                  <span className="non-match">
                    {highlighter(d.name, searchString)}
                  </span>
                </div>
                <div className="address">
                  <span className="non-match">
                    {highlighter(d.address, searchString)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="dropdown-item">No Results Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
