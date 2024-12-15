import { useRef ,useEffect} from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const Form = ({ open, onClose,fetchData,selectedRow}) => {
  console.log(selectedRow)
  const formRef = useRef({
    entityname: '',
    tasktype: '',
    date: '',
    phone: '',
    contactperson: '',
    notes: '',
    status: 'open'
  });

  useEffect(()=>{
    if(selectedRow){
      formRef.current.entityname=selectedRow.entityname || '',
      formRef.current.tasktype=selectedRow.tasktype || '',
      formRef.current.date=selectedRow.date || '',
      formRef.current.phone=selectedRow.phone || '',
      formRef.current.contactperson=selectedRow.contactperson || '',
      formRef.current.notes=selectedRow.notes || '',
      formRef.current.status=selectedRow.status || ''
    }
  },[selectedRow])

  const handleChange = (e) => {
    const { name, value } = e.target;
    formRef.current = {
      ...formRef.current,
      [name]: value
    };
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const entityname=formRef.current.entityname;
    const tasktype=formRef.current.tasktype;
    const date=formRef.current.date;
    const phone=formRef.current.phone;
    const contactperson=formRef.current.contactperson;
    const status=formRef.current.status;
    const notes=formRef.current.notes;

    console.log(entityname,tasktype,date,phone,contactperson,status,notes);
    try {
      if(selectedRow){
        await axios.put(`${API_BASE_URL}/tasks/${selectedRow._id}`, {
            entityname,
            tasktype,
            date,
            phone,
            contactperson,
            status,
            notes
        });
      }else{
        await axios.post(`${API_BASE_URL}/add`, {
            entityname,
            tasktype,
            date,
            phone,
            contactperson,
            status,
            notes
        });
      }
        // Reset form values
    formRef.current={
        entityname:"",
        tasktype:"",
        date:"",
        phone:"",
        contactperson:"",
        notes:"",
        status:"open"
    }
       await fetchData();
        onClose();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
  };



  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{selectedRow ? "Edit Task" : "Add New Task"}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '400px', marginTop: '1rem' }}>
          <TextField
            name="entityname"
            label="Enter Entity Name"
            defaultValue={formRef.current.entityname}
            onChange={handleChange}
            required
            fullWidth
          />
          
         

          <TextField
            name="date"
           
            type="date"
            defaultValue={formRef.current.date}
            onChange={handleChange}
            
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Task Type</InputLabel>
            <Select
              name="tasktype"
              defaultValue={formRef.current.tasktype}
              onChange={handleChange}
              label="Task Type"
            >
              <MenuItem value="call">Call</MenuItem>
              <MenuItem value="meeting">Meeting</MenuItem>
              <MenuItem value="video">video Calling</MenuItem>

            </Select>
          </FormControl>

          <TextField
            name="phone"
            label="Enter Phone Number"
            defaultValue={formRef.current.phone}
            onChange={handleChange}
            multiline
            
            fullWidth
          />
            <TextField
            name="contactperson"
            label="Enter Contact Person"
            defaultValue={formRef.current.contactperson}
            onChange={handleChange}
            multiline
            
            fullWidth
          />

        <TextField
            name="notes"
            label="Enter Notes"
            defaultValue={formRef.current.notes}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              defaultValue={formRef.current.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {selectedRow ? "Update Task" : "Add Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Form;