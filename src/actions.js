import { gql } from "@apollo/client";

export const FETCH_DATA = gql`
  {
    headers {
      header_id
      header_name
      table_id
    }
    rows {
      row_id
    }
    values {
      header_id
      row_id
      value
      value_id
    }
  }
`;

export const INSERT_HEADERS_ONE = gql`
  mutation InsertHeadersOne(
    $header_id: Int!
    $header_name: String!
    $table_id: Int!
  ) {
    insert_headers_one(
      object: {
        header_id: $header_id
        header_name: $header_name
        table_id: $table_id
      }
    ) {
      header_id
      header_name
    }
  }
`;

export const UPDATE_HEADERS_BY_PK = gql`
  mutation UpdateHeadersByPk($header_id: Int!, $header_name: String!) {
    update_headers_by_pk(
      pk_columns: { header_id: $header_id }
      _set: { header_name: $header_name }
    ) {
      header_id
      header_name
    }
  }
`;

export const INSERT_VALUES_ONE = gql`
  mutation InsertValuesOne(
    $header_id: Int!
    $row_id: Int!
    $value: String!
    $value_id: Int
  ) {
    insert_values_one(
      object: {
        header_id: $header_id
        row_id: $row_id
        value: $value
        value_id: $value_id
      }
    ) {
      header_id
      row_id
      value
      value_id
    }
  }
`;

export const UPDATE_VALUES_BY_PK = gql`
  mutation UpdateValuesByPk($value_id: Int!, $value: String!) {
    update_values_by_pk(
      pk_columns: { value_id: $value_id }
      _set: { value: $value }
    ) {
      header_id
      row_id
      value
      value_id
    }
  }
`;

export const INSERT_ROWS_ONE = gql`
  mutation InsertRowsOne($row_id: Int!, $table_id: Int!) {
    insert_rows_one(object: { row_id: $row_id, table_id: $table_id }) {
      row_id
    }
  }
`;
