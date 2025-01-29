import React from "react";
import Select from "react-select";

const MultiSelectBG = ({ onChange, dynamicValue }) => {
  const getBloodGroups = () => {
    // List of blood groups
    const bloodGroups = ["AB+", "AB-", "B-", "B+", "O+", "O-", "A+", "A-"];

    // Convert to options format expected by React-Select
    return bloodGroups.map((bloodGroup) => ({
      label: bloodGroup,
      value: bloodGroup.toUpperCase().replace(/\s/g, "-"),
    }));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Select Blood Groups:
      </label>
      <Select
        isMulti
        options={getBloodGroups()}
        onChange={onChange}
        value={dynamicValue}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default MultiSelectBG;
