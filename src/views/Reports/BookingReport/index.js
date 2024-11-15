import React, { useState, useEffect } from 'react';
import { Card, Container, Grid, Typography, Box, FormLabel, TextField, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';
import { allBooking } from 'api/apis';
import { url } from 'api/url';

const Calendar = () => {
  const [allBookingData, setAllBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = moment().format('YYYY-MM-DD');
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Booking Date',
      flex: 0.7,
      valueFormatter: ({ value }) => moment(value).format('MM-DD-YYYY')
    },
    { field: '_id', headerName: 'Booking ID', flex: 1 },
    { field: 'assignedTo', headerName: 'Assigned To', flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', flex: 1 },
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
              width: '70px',
              height: '30px',
              backgroundColor: backgroundColor,
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
        );
      }
    }
  ];

  const handleSubmit = async (values) => {
    const com_url = `${url.base_url}${url.booking.allReport}${values.startDate}/${values.endDate}`;

    try {
      setLoading(true);
      const response = await allBooking(com_url);

      if (response) {
        setAllBookingData(
          response.data.map((booking) => ({
            _id: booking.bookingId,
            createdAt: booking.createdAt,
            customerName: booking.customer[0]?.name || '',
            serviceStatus: booking.serviceStatus,
            assignedTo: booking?.employee?.[0]?.name || 'Not Assigned Yet'
          }))
        );
      } else {
        toast.error('No data found for this range.');
      }
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit({ startDate: yesterday, endDate: today });
  }, []);

  return (
    <Container>
      <Typography variant="h3" mb={5}>
        Booking Report
      </Typography>

      <Card style={{ paddingTop: '10px' }}>
        <Formik
          initialValues={{
            startDate: yesterday,
            endDate: today
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <Box width="100%" padding="30px">
                <Typography style={{ marginBottom: '15px' }} variant="h3">
                  Choose Date Range
                </Typography>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel>Start Date</FormLabel>
                    <TextField name="startDate" type="date" size="small" fullWidth value={values.startDate} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel>End Date</FormLabel>
                    <TextField name="endDate" type="date" size="small" fullWidth value={values.endDate} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel></FormLabel>
                    <Button
                      style={{
                        maxWidth: '200px',
                        maxHeight: '40px',
                        minWidth: '100px',
                        minHeight: '30px',
                        marginTop: '21px'
                      }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Card>

      {loading ? (
        <Typography variant="h6" color="textSecondary" align="center" mt={4}>
          Loading...
        </Typography>
      ) : allBookingData.length > 0 ? (
        <Card style={{ height: '600px', paddingTop: '15px', marginTop: '30px' }}>
          <DataGrid
            rows={allBookingData}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row._id}
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
          />
        </Card>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center" mt={4}>
          No data available for the selected range.
        </Typography>
      )}
    </Container>
  );
};

export default Calendar;
