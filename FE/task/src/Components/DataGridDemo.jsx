import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select } from '@mui/material';

const columns = [
  { field: 'date', headerName: 'Date', width: 120 },
  {
    field: 'entityname',
    headerName: 'Entity Name',
    width: 150,
    editable: true,
    align: 'right',
  },
  {
    field: 'tasktype',
    headerName: 'Task Type',
    width: 150,
    editable: true,
    align: 'right',
  },
  {
    field: 'time',
    headerName: 'Time',
    type: 'number',
    width: 110,
    editable: true,
    align: 'right',
  },
  {
    field: 'contactperson',
    headerName: 'Contact Person',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    align: 'right',
  },
  {
    field: 'notes',
    headerName: 'Notes',
    width: 450,
    editable: true,
    align: 'right',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    editable: true,
    align: 'right',
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

const rows = [
  { id: 1, date: '2024-01-01', tasktype: 'Snow', entityname: 'Jon', time: 14, contactperson: 'yash' },
  { id: 2, date: '2024-01-02', tasktype: 'Lannister', entityname: 'Cersei', time: 31, contactperson: 'yash' },
  { id: 3, date: '2024-01-03', tasktype: 'Lannister', entityname: 'Jaime', time: 31, contactperson: 'yash' },
  { id: 4, date: '2024-01-04', tasktype: 'Stark', entityname: 'Arya', time: 11, contactperson: 'yash' },
  { id: 5, date: '2024-01-05', tasktype: 'Targaryen', entityname: 'Daenerys', time: null, contactperson: 'yash' },
  { id: 6, date: '2024-01-06', tasktype: 'Melisandre', entityname: null, time: 150, contactperson: 'yash' },
  { id: 7, date: '2024-01-07', tasktype: 'Clifford', entityname: 'Ferrara', time: 44, contactperson: 'yash' },
  { id: 8, date: '2024-01-08', tasktype: 'Frances', entityname: 'Rossini', time: 36, contactperson: 'yash' },
  { id: 9, date: '2024-01-09', tasktype: 'Roxie', entityname: 'Harvey', time: 65, contactperson: 'yash' },
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
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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
      />
    </Box>
  );
}
