import React from "react";

const BloodGroupLists = ({ onChange, dynamicValue,label}) => {
  const getBloodGroups = () => {
    // List of blood groups
    const bloodGroups = ["AB+", "AB-", "B-", "B+", "O+", "O-", "A+", "A-"];

    return bloodGroups;
  };

  return (
    <div className="">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        { label ? label : "Select Blood Group"}
      </label>
      <div className="relative">
        <select
          onChange={onChange}
          className="block w-full px-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring focus:border-gray-300"
        >
          <option
            value={
              dynamicValue
                ? dynamicValue.toUpperCase().replace(/\s/g, "-")
                : "all"
            }
          >
            {dynamicValue ? dynamicValue : "All"}
          </option>
          {getBloodGroups().map((bloodGroup, index) => (
            <option
              key={index}
              value={bloodGroup.toUpperCase().replace(/\s/g, "-")}
            >
              {bloodGroup}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
};

export default BloodGroupLists;
