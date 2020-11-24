import React from "react";
import styled from "styled-components";
import { createBaseTableFrame } from "../utils";
import Row from "./Row";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

function Table({ headers, rows, onChange }) {
  const baseTable = createBaseTableFrame(50, 50, headers, rows);

  const renderBaseTable = () =>
    Object.values(baseTable).map((fields, i) => (
      <Row
        key={`row-id-${i}`}
        isHeader={i === 0}
        fields={fields}
        onChange={(value, field, headerIndex) =>
          onChange(value, field, headerIndex, i)
        }
      />
    ));
  return <Wrapper>{renderBaseTable()}</Wrapper>;
}

export default Table;
