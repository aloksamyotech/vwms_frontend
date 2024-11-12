import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { url } from 'api/url';
import { editServices } from 'api/apis';
import { useState } from 'react';

const AddMeetings = (props) => {
  const { open, handleClose, EditData, onSuccess } = props;
  const [isLoading , setIsLoading] = useState(false)

  const validationSchema = yup.object({
    name: yup.string().required('Name is required').max(50, 'Enter less than 50 characters'),
    desc: yup.string().required('Description is required').max(200, 'Enter less than 200 characters'),
    price: yup
      .number()
      .moreThan(0, 'Price must be greater than zero')
      .max(999999, 'Maximum 6 digits allowed')
      .required('Price is required'),
    hours: yup.number().required('Hours are required').min(0, 'Hours cannot be negative'),
    minutes: yup.number().required('Minutes are required').min(0).max(59, 'Minutes must be less than 60')
  });

  const formik = useFormik({
    initialValues: {
      name: EditData?.name || '',
      desc: EditData?.desc || '',
      price: EditData?.price || '',
      hours: EditData?.hours || '',
      minutes: EditData?.minutes || '',
      status: EditData?.status || ''
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      const id = EditData?._id;

      const com_url = `${url.base_url}${url.service.edit}${id}`;

      const response = await editServices(com_url, values);
      if (response) {
        await onSuccess();
        resetForm();
        handleClose();
        toast.success('Successfully Edited');
      } else {
        toast.warning('Edit Failed');
      }
      setIsLoading(false)
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Edit Service</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12}>
                  <FormLabel>Service Name</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Enter service title"
                    size="small"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>Service Description</FormLabel>
                  <TextField
                    id="desc"
                    name="desc"
                    placeholder="Enter service description"
                    size="small"
                    fullWidth
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    error={formik.touched.desc && Boolean(formik.errors.desc)}
                    helperText={formik.touched.desc && formik.errors.desc}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormLabel>Service Price</FormLabel>
                  <TextField
                    id="price"
                    name="price"
                    placeholder="Enter service price"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormLabel>Status</FormLabel>
                  <FormControl fullWidth size="small" error={formik.touched.status && Boolean(formik.errors.status)}>
                    <Select
                      id="status"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      displayEmpty
                      placeholder="Select status"
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Inactive">Inactive</MenuItem>
                    </Select>
                    {formik.touched.status && formik.errors.status && <FormHelperText>{formik.errors.status}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>Service Duration</FormLabel>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="hours"
                        name="hours"
                        placeholder="Hours"
                        type="number"
                        size="small"
                        fullWidth
                        value={formik.values.hours}
                        onChange={formik.handleChange}
                        error={formik.touched.hours && Boolean(formik.errors.hours)}
                        helperText={formik.touched.hours && formik.errors.hours}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="minutes"
                        name="minutes"
                        placeholder="Minutes"
                        type="number"
                        size="small"
                        fullWidth
                        value={formik.values.minutes}
                        onChange={formik.handleChange}
                        error={formik.touched.minutes && Boolean(formik.errors.minutes)}
                        helperText={formik.touched.minutes && formik.errors.minutes}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContentText>
            <DialogActions>
              <Button type="submit" variant="contained" style={{ textTransform: 'capitalize' }} color="secondary" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
              </Button>
              <Button
                type="button"
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

export default AddMeetings;
