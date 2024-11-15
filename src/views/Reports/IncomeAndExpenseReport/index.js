import React, { useState, useEffect } from 'react';
import { Card, Container, Grid, Typography, Box, FormLabel, TextField, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';
import { allBooking, IncomeAndExpenseReport } from 'api/apis';
import { url } from 'api/url';

const Calendar = () => {
  const [allBookingData, setAllBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const today = moment().format('YYYY-MM-DD');
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

  const columns = [
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 0.7,
      valueFormatter: ({ value }) => moment(value).format('MM-DD-YYYY')
    },
    { field: 'description', headerName: 'Description', flex: 1 },

    { field: 'amount', headerName: 'Amount', flex: 1 },
    {
      field: 'type',
      headerName: 'Income/Expense',
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            width: '70px',
            height: '30px',
            backgroundColor: params.value === 'Income' ? '#36d962' : '#ed6868',
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
  ];

  const handleSubmit = async (values) => {
    const com_url = `${url.base_url}${url.inAndEx.allInAndExReport}${values.startDate}/${values.endDate}`;

    try {
      setLoading(true);
      const response = await IncomeAndExpenseReport(com_url);

      if (response && response.data && response.data.length > 0) {
        setAllBookingData(
          response.data.map((booking) => ({
            _id: booking._id,
            type: booking.type,
            serviceStatus: booking.serviceStatus || 'Not Specified',
            amount: booking.amount || 0,
            description: booking.description || ''
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
        Income & Expense Report
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
