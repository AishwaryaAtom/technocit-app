
import React from "react";
import DataTable from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "50px",
    },
  },
  headCells: {
    style: {
      backgroundColor: "#f4f4f4",
      fontWeight: "bold",
    },
  },
  tableWrapper: {
    style: {
      maxHeight: "500px",
      overflowY: "auto",
      backgroundColor: "#fdfdfd", // custom background
    },
  },
};

const Table = ({ columns, data,children }) => {
  return (
    <div className="shadow border border-gray-200 rounded-md overflow-hidden bg-white">
      {children}
      <DataTable
        columns={columns}
        data={data}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        customStyles={customStyles}
        fixedHeader
        fixedHeaderScrollHeight="400px" // height for scroll
        highlightOnHover
        striped
      />
    </div>
  );
};

export default Table;
