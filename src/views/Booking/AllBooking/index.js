import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { IconEye } from '@tabler/icons';
import Iconify from '../../../ui-component/iconify';
import AddEmails from '../TodayBooking/Addemail';
import { url } from 'api/url';
import { todayBooking } from 'api/apis';
import { toast } from 'react-toastify';
import moment from 'moment';
import BookingDetails from '../BookingDetails';
import { useNavigate } from 'react-router-dom';
import { IconEdit } from '@tabler/icons'; //

const Documents = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [bookingData, setBookingData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [showBookingData, setShowBookingData] = useState([]);
  const [showBooking, setShowBooking] = useState(false);

  const navigate = useNavigate();

  const columns = [
    {
      field: 'id',
      headerName: 'Booking ID',
      flex: 0.7,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'name',
      headerName: 'Customer Name',
      flex: 0.7,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'date',
      headerName: 'Booking Date',
      flex: 0.7,
      valueFormatter: (params) => moment(params.value).format('MM:DD:YYYY')
    },
    // {
    //   field: 'time',
    //   headerName: 'Time',
    //   flex: 0.7,
    //   valueFormatter: (params) => moment(params.value).format('HH:mm')
    // },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      flex: 0.7,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: params.value === 'Success' ? '#36d962' : '#ed6868',
            color: 'white',
            padding: '6px',
            borderRadius: '6px',
            textAlign: 'center'
          }}
        >
          {params.value}
        </Box>
      )
    },
    {
      field: 'serviceStatus',
      headerName: 'Service Status',
      flex: 0.7,
      renderCell: (params) => {
        const statusColors = {
          Accepted: '#90ee90',
          Pending: '#66cdaa',
          Processing: '#4cae4c',
          Completed: '#36d962'
        };

        const backgroundColor = statusColors[params.value] || statusColors.default;

        return (
          <Box
            sx={{
              backgroundColor: backgroundColor,
              color: 'white',
              padding: '6px',
              borderRadius: '6px',
              textAlign: 'center'
            }}
          >
            {params.value}
          </Box>
        );
      }
    },
    {
      field: 'preview',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <>
          <Box sx={{ width: 'auto', padding: '4px' }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <Button variant="contained" onClick={() => handleOpenView(params.row)} sx={{ minWidth: '30px', padding: '4px' }}>
                <IconEye />
              </Button>
            </Stack>
          </Box>
          <Box sx={{ width: 'auto', padding: '4px' }}>
            <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={1}>
              <Button
                variant="contained"
                onClick={() => {
                  handleOpenBooking(params.row);
                }}
                sx={{ minWidth: '30px', padding: '4px' }}
              >
                <IconEdit fontSize="small" />
              </Button>
            </Stack>
          </Box>
        </>
      ),
      flex: 0.7
    }
  ];

  const handleOpenBooking = (row) => {
    setShowBookingData(row);

    console.log(`showBookingData----`, showBookingData);

    setShowBooking(true);
  };
  const handleCloseBooking = () => {
    setShowBooking(false);
  };
  const handleCloseView = () => setOpenView(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const fetchData = async () => {
    const com_url = `${url.base_url}${url.booking.all}`;
    try {
      const response = await todayBooking(com_url);
      const data = response.data;

      console.log(`data`, data);

      const rowData = data?.map((item, index) => ({
        id: item?.bookingId,
        _id: item._id,
        createdAt: item.createdAt,
        name: item.type?.[0]?.name || '',
        slot_time: item.slot_time,
        packageName: item.packages?.[0]?.name,
        paymentType: item.payments?.[0]?.paymentType,
        totalPrice: item.payments?.[0]?.amount,
        advancePayment: item.payments?.[0]?.advancePayment,
        packagePrice: item.packages?.[0]?.price,
        vehicleName: item.vehicleType?.[0]?.vehicleName,
        paymentStatus: item.payments?.[0]?.status,
        serviceStatus: item.serviceStatus,
        date: item.createdAt,
        time: item.createdAt,
        customerName: item?.type?.[0]?.name,
        customerAddress: item?.type?.[0]?.address,
        customerEmail: item?.type?.[0]?.email,
        paymentId: item?.payments?.[0]?._id,
        remainingAmount: item?.payments?.[0]?.remainingAmount,
        totalPaidAmount: item?.payments?.[0]?.totalPaidAmount,
        customerPhone: item?.type?.[0]?.phone,
        employeeFirstName: item?.employee?.[0]?.firstName,
        employeeLastName: item?.employee?.[0]?.lastName
      }));
      setShowData(rowData);
      setBookingData(rowData);
    } catch (error) {
      toast.error(`Error Fetching Data`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenView = (row) => {
    navigate(`/dashboard/booking/view/${row._id}`, { state: { bookingData: row } });
  };

  return (
    <>
      <AddEmails open={openAdd} handleClose={handleCloseAdd} onSuccess={fetchData} />
      <BookingDetails open={showBooking} bookingData={showBookingData} handleClose={handleCloseBooking} onSuccess={fetchData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent="space-between">
          <Typography variant="h3">Today Booking</Typography>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} aria-label="Add New Booking">
              Add New
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={showData}
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

export default Documents;
