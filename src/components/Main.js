import React from "react";
import styled from "styled-components";
import Table from "./Table";
import { useQuery, useMutation } from "@apollo/client";
import {
  FETCH_DATA,
  INSERT_HEADERS_ONE,
  INSERT_ROWS_ONE,
  INSERT_VALUES_ONE,
  UPDATE_HEADERS_BY_PK,
  UPDATE_VALUES_BY_PK,
} from "../actions";
import {
  formatData,
  isHeaderIdExist,
  isRowIdExist,
  getValueId,
  generateUniqueValueId,
} from "../utils";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

function Main() {
  const { data, loading, error } = useQuery(FETCH_DATA);
  const [insertHeadersOne] = useMutation(INSERT_HEADERS_ONE, {
    update(cache, { data: { insert_headers_one } }) {
      cache.writeQuery({
        query: FETCH_DATA,
        data: {
          ...data,
          headers: [...data.headers, insert_headers_one],
        },
      });
    },
  });
  const [updateHeadersByPk] = useMutation(UPDATE_HEADERS_BY_PK);
  const [insertRowsOne] = useMutation(INSERT_ROWS_ONE, {
    update(cache, { data: { insert_rows_one } }) {
      cache.writeQuery({
        query: FETCH_DATA,
        data: {
          ...data,
          rows: [...data.rows, insert_rows_one],
        },
      });
    },
  });
  const [insertValuesOne] = useMutation(INSERT_VALUES_ONE, {
    update(cache, { data: { insert_values_one } }) {
      cache.writeQuery({
        query: FETCH_DATA,
        data: {
          ...data,
          values: [...data.values, insert_values_one],
        },
      });
    },
  });
  const [updateValuesByPk] = useMutation(UPDATE_VALUES_BY_PK);
  const table_id = 1;

  if (loading) {
    return "Loading...";
  }

  if (error) {
    console.error(error);
    return "Something wrong happend!";
  }
  const { headers, rows } = formatData(data);

  const handleChanges = (value, field, headerIndex, rowIndex) => {
    if (value === field) {
      return;
    }
    if (rowIndex === 0) {
      handleHeaderChanged(headerIndex, value);
    } else {
      handleFieldChanged(headerIndex, rowIndex, value);
    }
  };

  const handleHeaderChanged = (headerIndex, value) => {
    if (isHeaderIdExist(data, headerIndex)) {
      updateHeadersByPk({
        variables: { header_id: headerIndex, header_name: value },
      });
    } else {
      insertHeadersOne({
        variables: {
          header_id: headerIndex,
          header_name: value,
          table_id,
        },
      });
    }
  };

  const handleFieldChanged = async (headerIndex, rowIndex, value) => {
    if (!isHeaderIdExist(data, headerIndex)) {
      await insertHeadersOne({
        variables: {
          header_id: headerIndex,
          header_name: "",
          table_id,
        },
      });
    }
    if (!isRowIdExist(data, rowIndex)) {
      await insertRowsOne({
        variables: {
          row_id: rowIndex,
          table_id,
        },
      });
    }
    const valueId = getValueId(data, headerIndex, rowIndex);
    if (valueId) {
      updateValuesByPk({ variables: { value_id: valueId, value } });
    } else {
      insertValuesOne({
        variables: {
          header_id: headerIndex,
          row_id: rowIndex,
          value_id: generateUniqueValueId(headerIndex, rowIndex),
          value,
        },
      });
    }
  };
  return (
    <Wrapper>
      <Table headers={headers} rows={rows} onChange={handleChanges} />
    </Wrapper>
  );
}

export default Main;
