import React from 'react';

import { useState } from 'react';

import { Stack, Button, Alert, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconTrash, IconEdit } from '@tabler/icons';

import Iconify from '../../../ui-component/iconify';
import TableStyle from '../../../ui-component/TableStyle';
import { style } from '@mui/system';
import AddService from './AddService.js';

const leadData = [
  {
    id: 1,
    name: 'Booked',
    status: 'Active',
    action: ''
  }
];

const ServiceStatus = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 3,
      cellClassName: 'name-column--cell--capitalize'
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 10,
      renderCell: () => {
        return (
          <>
            <Box sx={{ width: 'auto', padding: '4px' }}>
              <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={1}>
                <Button variant="contained" onClick={handleOpenAdd} sx={{ minWidth: '30px', padding: '4px' }}>
                  <IconEdit fontSize="small" />
                </Button>
              </Stack>
            </Box>
          </>
        );
      },
      flex: 1
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddService open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Service Status</Typography>
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
                rows={leadData}
                columns={columns}
                checkboxSelection
                getRowId={(row) => row.id}
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

export default ServiceStatus;
