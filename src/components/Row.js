import React from "react";
import styled from "styled-components";
import Field from "./Field";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

function Row({ isHeader, fields, onChange }) {
  const renderFields = () =>
    Object.values(fields).map((field, i) => (
      <Field
        key={`field-id-${i}`}
        isHeader={isHeader}
        isDisabled={i === 0}
        field={field}
        onChange={(value) => onChange(value, field, i)}
      ></Field>
    ));

  return <Wrapper>{renderFields()}</Wrapper>;
}

export default Row;
