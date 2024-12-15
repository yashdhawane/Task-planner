import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, MenuItem, Select } from '@mui/material';
import useFetch from '../hooks/useFetch';
import Form from './Form';
import axios from 'axios';
import { useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


export default function DataGridDemo() {
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
          value={selectValues[params.row.id] || ''}
          size="small"
          sx={{ width: '100%' }}
          onChange={(event) => handleAction(event.target.value, params.row,fetchData)}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select
          </MenuItem>
          <MenuItem value="edit">Edit</MenuItem>
          <MenuItem  value="delete">Delete</MenuItem>
          <MenuItem value="change_status">Change Status</MenuItem>
        </Select>
      ),
    },
  ];
  const [modal,setmodal]=React.useState(false)
  const [selectedRow, setSelectedRow] = React.useState(null);
  const {data,loading,error,fetchData}=useFetch(API_BASE_URL)
  const [selectValues, setSelectValues] = React.useState({});

  const handleAction = async (action, row,fetchData) => {
    switch (action) {
      case 'edit':
        console.log(`Edit action for row: ${row.id}`);
        setSelectedRow(row)
        setmodal(true)
        break;
      case 'delete':
        console.log(`delete action for row: ${row.id}`);
        alert('Are you sure you want to delete this task?')
        await axios.delete(`${API_BASE_URL}/tasks/${row.id}`)
        fetchData()
        break;
      case 'change_status':
        console.log(`Change Status action for row: ${row.id}`);
        const newstatus=row.status === 'open' ? 'closed' : 'open';
        await axios.put(`${API_BASE_URL}/tasks/${row.id}`, {
          status: newstatus
        })
        fetchData()
        break;
      default:
        console.log(`Unknown action: ${action}`);
    }
    setSelectValues(prev => ({ ...prev, [row.id]: '' }));
  };
  

useEffect(()=>{
  fetchData()
},[])
 
  return (
    <>
    <Button variant='contained' onClick={()=>{
      setmodal(true)
      setSelectedRow(null)
    }}>ADD</Button>

    {modal && <Form open={modal} onClose={()=>{
      setmodal(false)
    }} fetchData={fetchData} selectedRow={selectedRow}/>}
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
