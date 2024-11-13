/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Container, Typography, Box, Card } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import AddContact from '../Contact/AddContact';

// ----------------------------------------------------------------------

const leadData = [
  {
    id: 1,
    bookingID: 'jonny',
    name: 'Doe',
    amount: 'male',
    txnID: '9981923587',
    status: 'Success',
    emailAddress: 'ap@samyotech.com',
    date: 'Edit'
  }
];
const Contact = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'bookingID',
      headerName: 'Booking ID',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1
    },
    {
      field: 'txnID',
      headerName: 'Txn ID',
      flex: 1
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
          backgroundColor: params.value === 'Success' ? '#36d962' : '#ed6868',
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
      )
    },
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1
      // eslint-disable-next-line arrow-body-style
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddContact open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Payment Transacation</Typography>
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

export default Contact;
