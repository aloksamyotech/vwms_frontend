import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FormLabel, FormControl, Select, MenuItem, FormHelperText } from '@mui/material'; 
import { url } from 'api/url';
import { allService, createBooking } from 'api/apis';
import { useState, useEffect } from 'react';

const AddEmails = (props) => {
  const { open, handleClose, onSuccess } = props;
  const [allServices, setAllService] = useState([]);
  const [isLoading , setIsLoading] = useState(false)

  
  const validationSchema = yup.object({
    services: yup.string().required('services are required').max(50, 'Enter less than 50 characters'),
    name: yup.string().required('name is required').max(50, 'Enter less than 50 characters'),
    email: yup.string().email('Invalid email format').required('email is required'),
    phone: yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be numeric')
      .required('phone is required')
      .min(10, 'Must be at least 10 digits')
      .max(15, 'Cannot exceed 15 digits'),
      slot_time: yup.date().required('slot_time is required'), 
    total: yup.number()
      .moreThan(0, 'Total must be more than zero')
      .required('total is required')
      .max(999999, 'Cannot exceed 6 digits'),
  });

  const initialValues = {
    email: '',
    name: '',
    phone: '',
    slot_time: '',
    services: '',
    total: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      const com_url = `${url.base_url}${url.booking.create}`;
      const response = await createBooking(com_url, values);
      console.log(`com_url`, com_url);
      console.log(`response `, response);

      if (response) {
        await onSuccess();
        handleClose();
        resetForm();
        toast.success('Successfully created');
      } else {
        toast.warning('Not created');
      }
      setIsLoading(false)
    }
  });

  const fetchService = async () => {
    const com_url = `${url.base_url}${url.service.all_service}`;

    const response = await allService(com_url);
    if (response) {
      setAllService(response.data);
    } else {
      toast.error(`Fetching Error data`);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">Add New Package</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    size="small"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    size="small"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Phone</FormLabel>
                  <TextField
                    id="phone"
                    name="phone"
                    placeholder="Enter phone"
                    type="number" 
                    size="small"
                    fullWidth
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Slot Date & Time</FormLabel>
                  <TextField
                    name="slot_time"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={formik.values.slot_time}
                    onChange={formik.handleChange}
                    error={formik.touched.slot_time && Boolean(formik.errors.slot_time)}
                    helperText={formik.touched.slot_time && formik.errors.slot_time}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Service</FormLabel>
                    <Select
                      labelId="service-select-label"
                      id="services"
                      name="services" 
                      size="small"
                      fullWidth
                      value={formik.values.services}
                      onChange={formik.handleChange}
                      error={formik.touched.services && Boolean(formik.errors.services)}
                    >
                      {allServices?.map((service) => (
                        <MenuItem key={service?._id} value={service?._id}>
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: 'error.main' }}>
                      {formik.touched.services && formik.errors.services}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Total Cost</FormLabel>
                  <TextField
                    id="total"
                    name="total"
                    placeholder="Enter Total"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.total}
                    onChange={formik.handleChange}
                    error={formik.touched.total && Boolean(formik.errors.total)}
                    helperText={formik.touched.total && formik.errors.total}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }} color="secondary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                type="reset"
                variant="outlined"
                style={{ textTransform: 'capitalize' }}
                onClick={() => {
                  formik.resetForm();
                  handleClose();
                }}
                color="error"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmails;
