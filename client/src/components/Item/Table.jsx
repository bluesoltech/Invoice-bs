import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ items, setItems }) {
  const columns = [
    { field: "id", headerName: "ID", width: 40, hideable: true },
    { field: "value", headerName: "Particulars", width: 200 },
    { field: "size", headerName: "Size", width: 70 },
    { field: "sqft", headerName: "Sqft", width: 70 },
    { field: "qty", headerName: "Quantity", width: 70 },
    { field: "days", headerName: "Days", width: 70 },
    {
      field: "details",
      headerName: "Details",
      type: "number",
      width: 90,
    },
    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 70,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 90,
      valueGetter: (params) => `${params.row.qty * params.row.rate || ""}`,
    },
    {
      label: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <button
          onClick={() => {
            handleDelete(params.row.id);
          }}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
        >
          Delete
        </button>
      ),
    },
  ];
  const handleDelete = (id) => {
    const filteredItems = items.filter((item) => {
      return item.id.toString() != id.toString();
    });

    setItems(filteredItems);
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
