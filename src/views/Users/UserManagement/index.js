import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconEdit } from '@tabler/icons';
import TableStyle from '../../../ui-component/TableStyle';
import Iconify from '../../../ui-component/iconify';
import { url } from 'api/url';
import { allUser } from 'api/apis';
import { toast } from 'react-toastify';
import EditPage from './EditPage';
import OpenAddUser from '../AddUser/index.js';

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
            width: '70px',
            height: '30px',
            backgroundColor: params.value === 'Active' ? '#36d962' : '#ed6868',
            color: 'white',
            padding: '4px',
            borderRadius: '6px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
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
    setOpenEdit(true);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser(null);
  };

  const handleCloseAdd = () => setOpenAdd(false);

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
      <OpenAddUser open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />

      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Employee List</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add New
            </Button>
          </Stack>
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
