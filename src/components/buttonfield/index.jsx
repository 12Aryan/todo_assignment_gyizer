import React from "react";

const ButtonField = ({ icon ,text,disabled ,style, onClick}) => {
  return (
      <button disabled={disabled} style={style} className="buttonField" onClick={onClick}>{text && <div>{text}</div>}{icon && <div>{icon}</div>}</button>
  );
};

export default ButtonField;
