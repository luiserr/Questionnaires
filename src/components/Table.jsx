import { DataGrid } from "@mui/x-data-grid";
import React from "react";

function TableList(props) {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}

export { TableList };
