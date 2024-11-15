import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Grid, Select, MenuItem } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { url } from 'api/url';
import { allEmployee, editBooking } from 'api/apis';
import moment from 'moment';

const BookingDetails = ({ open, handleClose, bookingData, onSuccess }) => {
  const getSelectedDate = bookingData?.slot_time;
  const splitDate = getSelectedDate?.split(' ')[0];
  const splitTime = getSelectedDate?.split(' ')[1];

  const [employees, setEmployees] = useState([]);
  const [packages, setPackage] = useState([]);
  const [assigned, setAssigned] = useState('');

  const validationSchema = yup.object({
    status: yup.string().required('Status is required')
  });

  const fetchEmployeeData = async () => {
    const com_url = `${url.base_url}${url.user.all_user}`;
    try {
      const response = await allEmployee(com_url);
      if (response) {
        setEmployees(response.data);
      } else {
        toast.error('Fetching Error');
      }
    } catch (error) {
      toast.error('Fetching Error');
    }
  };

  const fetchPackage = async () => {
    const com_url = `${url.base_url}${url.package.all}`;
    try {
      const response = await allEmployee(com_url);

      if (response) {
        setPackage(response.data);
      } else {
        toast.error('Fetching Error');
      }
    } catch (error) {
      toast.error('Fetching Error');
    }
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchPackage();
  }, []);

  const formik = useFormik({
    initialValues: {
      status: bookingData?.serviceStatus || '',
      assignedTo: bookingData?.employeeId ? bookingData?.employeeId : ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const id = bookingData?._id;
      const data = {
        status: values.status,
        assignedTo: values.assignedTo,
        slot_time: bookingData?.slot_time
      };
      setAssigned(values.assignedTo);
      const com_url = `${url.base_url}${url.booking.edit}${id}`;

      try {
        const response = await editBooking(com_url, data);

        if (response.data.errorCode == 400) {
          toast.error('Slot not available');
        } else if (response.data.errorCode == 500) {
          toast.error('Update failed, server error');
        } else if (response.status == 200) {
          await onSuccess();
          toast.success('Successfully Assigned');
          resetForm();
          handleClose();
        } else {
          toast.error('Update Failed');
        }
      } catch (error) {
        toast.error('Update Failed');
      }
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="booking-details-dialog-title">
      <DialogTitle
        id="booking-details-dialog-title"
        sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#1976d2', color: 'white', padding: '16px' }}
      >
        <Typography variant="h6" sx={{ color: 'white' }}>
          Change Booking Status
        </Typography>
        <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer', color: 'white' }} />
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: '#f4f6f8' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Total Amount
              </Typography>
              <Typography variant="h5" sx={{ color: '#333', fontWeight: 700 }}>
                ₹{bookingData?.packagePrice || 0}.00
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Booking Slot
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                <strong>Date:</strong> {splitDate}
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                <strong>Time:</strong> {splitTime}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Vehicle Name
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                <strong>{bookingData?.vehicleName || 'N/A'}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Selected Package
              </Typography>
              <Typography variant="body1" sx={{ color: '#333' }}>
                <strong>{bookingData?.packageName || 'N/A'}</strong>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Update Status
              </Typography>
              <Select
                fullWidth
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: 2,
                  '&:hover': {
                    borderColor: '#3f51b5'
                  },
                  '& .MuiSelect-icon': {
                    color: '#3f51b5'
                  }
                }}
              >
                <MenuItem value="Accepted" sx={{ color: '#4caf50' }}>
                  Accepted
                </MenuItem>
                <MenuItem value="Pending" sx={{ color: '#ff9800' }}>
                  Pending
                </MenuItem>
                <MenuItem value="Processing" sx={{ color: '#2196f3' }}>
                  Processing
                </MenuItem>
                <MenuItem value="Completed" sx={{ color: '#4caf50' }}>
                  Completed
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 500 }}>
                Assign To
              </Typography>
              <Select
                fullWidth
                id="assignedTo"
                name="assignedTo"
                value={formik.values.assignedTo}
                onChange={formik.handleChange}
                error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: 2,
                  '&:hover': {
                    borderColor: '#3f51b5'
                  },
                  '& .MuiSelect-icon': {
                    color: '#3f51b5'
                  }
                }}
              >
                {employees.map((employee) => (
                  <MenuItem key={employee._id} value={employee._id}>
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <DialogActions sx={{ paddingTop: '20px', paddingBottom: '20px', bgcolor: '#f4f6f8' }}>
            <Button type="submit" variant="contained">
              Update
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{ borderColor: '#f44336', color: '#f44336', '&:hover': { borderColor: '#d32f2f', color: '#d32f2f' } }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetails;
