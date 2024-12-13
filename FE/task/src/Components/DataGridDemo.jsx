import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, MenuItem, Select } from '@mui/material';
import useFetch from '../hooks/useFetch';
import Form from './Form';
const columns = [
  { field: 'date', headerName: 'Date', width: 120 },
  {
    field: 'entityname',
    headerName: 'Entity Name',
    width: 150,
    
    align: 'left',
  },
  {
    field: 'tasktype',
    headerName: 'Task Type',
    width: 150,
    
    align: 'left',
  },
  
  {
    field: 'contactperson',
    headerName: 'Contact Person',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    align: 'left',
  },
  {
    field: 'phone',
    headerName: 'Phone',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    align: 'left',
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 450,
    
    align: 'left',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    
    align: 'left',
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 180,
    renderCell: (params) => (
      <Select
        defaultValue=""
        size="small"
        sx={{ width: '100%' }}
        onChange={(event) => handleAction(event.target.value, params.row)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select
        </MenuItem>
        <MenuItem value="edit">Edit</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuItem value="change_status">Change Status</MenuItem>
      </Select>
    ),
  },
];



const handleAction = (action, row) => {
  switch (action) {
    case 'edit':
      console.log(`Edit action for row: ${row.id}`);
      break;
    case 'duplicate':
      console.log(`Duplicate action for row: ${row.id}`);
      break;
    case 'change_status':
      console.log(`Change Status action for row: ${row.id}`);
      break;
    default:
      console.log(`Unknown action: ${action}`);
  }
};

export default function DataGridDemo() {
  const [modal,setmodal]=React.useState(false)
  const {data,loading,error,fetchData}=useFetch('http://localhost:3000/')
  
  return (
    <>
    <Button variant='contained' onClick={()=>{
      setmodal(true)
    }}>ADD</Button>

    {modal && <Form open={modal} onClose={()=>{
      setmodal(false)
    }} fetchData={fetchData}/>}
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    
    <Box sx={{ height: 400, width: '100%' }}>
      {data && <DataGrid
         rows={data.map(row => ({ ...row, id: row._id }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />}
    </Box>
    </>
  );
}
