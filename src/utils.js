export const createBaseTableFrame = (rowsNum, columnsNum, headers, rows) => {
  const baseTableFrame = {};

  for (let i = 0; i < columnsNum; i++) {
    baseTableFrame[i] = {};
    for (let j = 0; j < rowsNum; j++) {
      if (i === 0) {
        baseTableFrame[i][j] = headers[j] || "";
      } else {
        if (j === 0) {
          baseTableFrame[i][j] = `${i}`;
        } else {
          const currentRow = rows[i];
          if (currentRow && currentRow[j]) {
            baseTableFrame[i][j] = currentRow[j];
          } else {
            baseTableFrame[i][j] = "";
          }
        }
      }
    }
  }

  return baseTableFrame;
};

export const formatData = (data) => {
  let headers = [];
  let rows = [];
  if (data) {
    data.headers.forEach(({ header_id, header_name }) => {
      headers[header_id] = header_name;
    });
    data.values.forEach(({ header_id, row_id, value }) => {
      if (!rows[row_id]) {
        rows[row_id] = [];
      }
      rows[row_id][header_id] = value;
    });
  }
  return { headers, rows };
};

export const isHeaderIdExist = (data, headerId) =>
  data && data.headers.some(({ header_id }) => header_id === headerId);

export const isRowIdExist = (data, rowId) =>
  data && data.rows.some(({ row_id }) => row_id === rowId);

export const getValueId = (data, headerId, rowId) => {
  if (!data) {
    return;
  }
  const value = data.values.find(
    ({ row_id, header_id }) => row_id === rowId && header_id === headerId
  );
  return value && value.value_id;
};
// const generateRowsData = () => {
//   const { values, headers } = data;
//   const _baseTable = { ...baseTable };

//   headers.forEach(({ header_id, header_name }) => {
//     _baseTable.rows[0][header_id] = { value: header_name };
//   });

//   values.forEach(({ header_id, row_id, value, value_id }) => {
//     _baseTable.rows[row_id][header_id] = { value, valueId: value_id };
//   });

//   setBaseTable(_baseTable);
// };

// const [insertHeadersOne] = useMutation(INSERT_HEADERS_ONE, {
//     variables: { header_id: headerId, header_name: value, table_id },
//     onCompleted: (data) => {
//       console.log("Insert header succeed");
//     },
//   });
//   const [updateHeadersByPk] = useMutation(UPDATE_HEADERS_BY_PK, {
//     variables: { header_id: headerId, header_name: value },
//     onCompleted: (data) => {
//       // If update not succeeded we try to insert
//       if (data && data.update_headers_by_pk === null) {
//         const variables = {
//           header_id: headerId,
//           header_name: value,
//           table_id,
//         };
//         insertHeadersOne({
//           variables,
//         });
//       } else {
//         console.log("Update header succeed");
//       }
//     },
//   });

// const [insertValuesOne] = useMutation(INSERT_VALUES_ONE, {
//     variables: {
//       header_id: headerId,
//       row_id: rowId,
//       value: value,
//       value_id: generateUniqueValueId(),
//     },
//     onCompleted: (data) => {
//       setValueId(data.insert_values_one && data.insert_values_one.value_id);
//       console.log("Insert value succeed");
//     },
//   });

//   const [updateValuesByPk] = useMutation(UPDATE_VALUES_BY_PK, {
//     variables: { value_id: valueId, value },
//     onCompleted: (data) => {
//       console.log("Update value succeed");
//     },
//   });

//   const [insertRowsOne] = useMutation(INSERT_ROWS_ONE, {
//     variables: { row_id: rowId, table_id },
//     update(cache, { data: { nsert_rows_one } }) {
//       debugger;
//     },
//     onCompleted: (data) => {
//       // console.log("insert row succeed");
//       insertValuesOne();
//     },
//   });

export const generateUniqueValueId = (headerId, rowId) => {
  const headerSign = headerId < 10 ? `0${headerId}` : `${headerId}`;
  const rowSign = rowId < 10 ? `0${rowId}` : `${rowId}`;
  const newValueId = "1" + rowSign + headerSign;
  return Number(newValueId);
};
