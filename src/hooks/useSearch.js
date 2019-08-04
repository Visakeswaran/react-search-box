import { useState } from "react";
import mockData from "../mockData.json";

const useSearch = () => {
  const [searchString, setSearchString] = useState("");
  console.log(mockData);
  return {
    data: mockData.filter(
      d =>
        d.id.toLowerCase().search(searchString.toLowerCase()) !== -1 ||
        d.name.toLowerCase().search(searchString.toLowerCase()) !== -1 ||
        d.address.toLowerCase().search(searchString.toLowerCase()) !== -1 ||
        d.items.includes(searchString)
    ),
    searchString,
    setSearchString
  };
};

export default useSearch;
