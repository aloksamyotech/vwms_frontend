import { useState } from 'react';
import { Stack, Container, Typography, Box, Card } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddContact from '../Contact/AddContact';
import { url } from 'api/url';
import { allPayments } from 'api/apis';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
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
  const [allPaymentsData, setAllPaymentsData] = useState([]);
  const columns = [
    {
      field: 'bookingId',
      headerName: 'Booking ID',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'customerName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.7
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.2
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
    }
    // {
    //   field: 'date',
    //   headerName: 'Date',
    //   flex: 1
    // }
  ];

  const handleCloseAdd = () => setOpenAdd(false);

  const getAllPayments = async () => {
    const com_url = `${url.base_url}${url.payments.all}`;
    const response = await allPayments(com_url);
    const data = response?.data;
    const rowData = data?.map((item, index) => ({
      _id: item._id,
      amount: item.amount,
      status: item.status,
      customerName: item.customer?.[0]?.name,
      bookingId: item.customer?.[0]?.bookingId,
      email: item.customer?.[0]?.email
    }));
    setAllPaymentsData(rowData);
  };
  useEffect(() => {
    getAllPayments();
  }, []);
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
                rows={allPaymentsData}
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

export default Contact;
