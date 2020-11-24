import React, { useState } from "react";
import styled from "styled-components";

const HeaderInput = styled.input`
  display: flex;
  width: ${(props) => (props.disabled ? "50" : "150")}px;
  height: 50px;
  text-align: center;
  color: red;
  font-weight: bold;
`;

const ValueInput = styled.input`
  display: flex;
  width: ${(props) => (props.disabled ? "50" : "150")}px;
  height: 50px;
  text-align: center;
  color: black;
`;

function Field({ isHeader, field, isDisabled, onChange }) {
  const [value, setValue] = useState(field);

  return isHeader ? (
    <HeaderInput
      value={value}
      type="text"
      disabled={isDisabled}
      onChange={({ target: { value } }) => setValue(value)}
      onBlur={({ target: { value } }) => onChange(value)}
    />
  ) : (
    <ValueInput
      value={value}
      type="text"
      disabled={isDisabled}
      onChange={({ target: { value } }) => setValue(value)}
      onBlur={({ target: { value } }) => onChange(value)}
    />
  );
}

export default Field;
