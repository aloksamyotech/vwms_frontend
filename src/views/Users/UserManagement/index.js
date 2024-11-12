import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconEdit } from '@tabler/icons';
import TableStyle from '../../../ui-component/TableStyle';
import { url } from 'api/url';
import { allUser } from 'api/apis';
import { toast } from 'react-toastify';
import EditPage from './EditPage';

const UserManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [allUserData, setAllUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Username',
      flex: 1.5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'role',
      headerName: 'Role',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value === 'Active' ? '#36d962' : '#de5757',
            color: 'white',
            padding: '6px',
            borderRadius: '6px',
            textAlign: 'center'
          }}
        >
          {params.value}
        </Box>
      ),
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <Box sx={{ width: 'auto', padding: '4px' }}>
            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={1}>
              <Button variant="contained" onClick={() => handleOpenEdit(params.row)} sx={{ minWidth: '30px', padding: '4px' }}>
                <IconEdit fontSize="small" />
              </Button>
            </Stack>
          </Box>
        );
      },
      flex: 0.6
    }
  ];

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setOpenEdit(true)
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser(null);
  };

  const handleEditUser = async () => {
    toast.success('User updated successfully');
    handleCloseEdit();
  };

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.user.all_user}`;
    try {
      const response = await allUser(com_url);
      if (response) {
        setAllUserData(response?.data);
      }
    } catch (error) {
      toast.error(`Error fetching data`);
    }
  };
  useEffect(() => {
   

    fetchData();
  }, []);

  return (
    <>
      <EditPage EditData={selectedUser} open={openEdit} handleClose={handleCloseEdit} onSuccess={fetchData} />
      
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">User List</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={allUserData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>

     
      </Container>
    </>
  );
};

export default UserManagement;
