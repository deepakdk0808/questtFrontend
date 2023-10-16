import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'; 
import { useState,useEffect } from 'react';
import axios from "axios";


function EditToolbar(props) {

  return (
    <GridToolbarContainer>
    </GridToolbarContainer>
  );
}

export default function AdminTable() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(()=>{
    getAllBooks()
    // eslint-disable-next-line
   },[])
 
   const getAllBooks=async()=>{
     const res=await axios.get(`https://questt.onrender.com/api/books/allBooks`)
     setRows(res.data)
     console.log("booo",res.data)
   }

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
  };

  const handleDeleteClick = (id) => () => {
    if (window.confirm("Are you sure that you want to Delete that Product?"))
    {
      axios.delete(`https://questt.onrender.com/api/books/${id}`)
      .then((resp)=>{
          getAllBooks()
          alert(resp.data)
      })
      .catch((err)=>{
          console.log("err",err)
      })
    }

  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row._id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row._id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));

    console.log("up",updatedRow)

    axios.patch(`https://questt.onrender.com/api/books/${updatedRow._id}`,updatedRow)
    .then((resp)=>{
        console.log("update",resp.data)
        // alert(resp.data)
        getAllBooks()
    })
    .catch((err)=>{
        console.log("err",err)
    })
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      type: 'string',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'publisher',
      headerName: 'Publisher',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'publication_date',
      headerName: 'Publication Date',
      width: 220,
      editable: true,
      type: 'string',
      
    },
    {
        field: 'language_code',
        headerName: 'Language',
        width: 220,
        editable: true,
        type: 'string',
        
      },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
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
    <>
    {rows?
    <Box
    sx={{
      height: 500,
      width: '100%',
      '& .actions': {
        color: 'text.secondary',
      },
      '& .textPrimary': {
        color: 'text.primary',
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
      getRowId={(row)=>row._id}
      slots={{
        toolbar: EditToolbar,
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel },
      }}
    />
  </Box>
    :
    ""
    }
    </>
  );
}
