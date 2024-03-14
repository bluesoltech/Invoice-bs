// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// export default function DataTable({ items, setItems }) {
//   const columns = [
//     { field: "id", headerName: "ID", width: 40, hideable: true },
//     { field: "value", headerName: "Particulars", width: 200 },
// { field: "size", headerName: "Size", width: 70 },
// { field: "sqft", headerName: "Sqft", width: 70 },
// { field: "qty", headerName: "Quantity", width: 70 },
// { field: "days", headerName: "Days", width: 70 },
// {
//   field: "details",
//   headerName: "Details",
//   type: "number",
//   width: 90,
// },
// {
//   field: "rate",
//   headerName: "Rate",
//   type: "number",
//   width: 70,
// },
// {
//   field: "amount",
//   headerName: "Amount",
//   type: "number",
//   width: 90,
//   valueGetter: (params) => `${params.row.qty * params.row.rate || ""}`,
// },
//     {
//       label: "action",
//       headerName: "Actions",
//       renderCell: (params) => (
//         <button
//           onClick={() => {
//             handleDelete(params.row.id);
//           }}
//           className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-700"
//         >
//           Delete
//         </button>
//       ),
//     },
//   ];
//   const handleDelete = (id) => {
//     const filteredItems = items.filter((item) => {
//       return item.id.toString() != id.toString();
//     });

//     setItems(filteredItems);
//   };
//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         rows={items}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        value: "",
        symbol: "",
        size: "",
        sqft: "",
        qty: 0,
        days: "",
        details: "",
        rate: 0,
        amount: 0,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "value" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add New
      </Button>
    </GridToolbarContainer>
  );
}

export default function DataTable({ items, setItems }) {
  const [rows, setRows] = useState(items);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    setRows(items);
  }, [items]);

  useEffect(() => {
    setItems(rows);
  }, [rows]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    // console.log(rows);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    setItems(rows);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "value", headerName: "Particulars", width: 180, editable: true },
    { field: "size", headerName: "Size", width: 100, editable: true },
    { field: "sqft", headerName: "Sqft", width: 100, editable: true },
    {
      field: "qty",
      headerName: "Quantity",
      type: "number",
      width: 180,
      editable: true,
    },
    { field: "days", headerName: "Days", width: 120, editable: true },
    {
      field: "details",
      headerName: "Details",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "rate",
      headerName: "Rate",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 150,
      editable: true,
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   width: 80,
    //   align: "left",
    //   headerAlign: "left",
    //   editable: true,
    // },
    // {
    //   field: "joinDate",
    //   headerName: "Join date",
    //   type: "date",
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: "role",
    //   headerName: "Department",
    //   width: 220,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: ["Market", "Finance", "Development"],
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
