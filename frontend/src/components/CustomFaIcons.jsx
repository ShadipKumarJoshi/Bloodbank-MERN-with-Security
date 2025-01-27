import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CustomFaIcons = ({ icon, size, spin, className }) => {
  return (
    <FontAwesomeIcon
      spin={spin ? spin : null}
      size={size ? size : "lg"}
      className={className ? className : "m-2 "}
      icon={icon}
    />
  );
};

export default CustomFaIcons;
