import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormLabel, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import { url } from 'api/url';
import { createOutOfService } from 'api/apis';
import { useState } from 'react';

const AddPolicy = (props) => {
  const { open, handleClose, onSuccess } = props;
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    desc: yup.string().required('Service Description is required'),
    startDate: yup.date().required('Start Date is required'),
    endDate: yup.date().required(' End Date is required')
  });

  const initialValues = {
    desc: '',
    startDate: '',
    endDate: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const formateStartDate = moment(values.startDate).format('YYYY-MM-DD hh:mm A');
      const formateEndDate = moment(values.endDate).format('YYYY-MM-DD hh:mm A');
      const data = {
        startDate: formateStartDate,
        endDate: formateEndDate,
        desc: values.desc
      };

      const com_url = `${url.base_url}${url.out_of_service.create}`;

      const response = await createOutOfService(com_url, data);

      if (response) {
        toast.success(`Successfully Created`);
        await onSuccess();
        resetForm();
        handleClose();
      } else {
        console.error(`error: ${err}`);
        toast.warning('Not created');
      }
      setIsLoading(false);
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h4">Add New Out of service(Schedule Holidays)</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h3">
                Choose Date
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Start Date</FormLabel>
                  <TextField
                    name="startDate"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>End Date</FormLabel>
                  <TextField
                    name="endDate"
                    type={'datetime-local'}
                    size="small"
                    fullWidth
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <FormLabel>Service Description</FormLabel>
                    <TextField
                      labelId="demo-simple-select-label"
                      id="desc"
                      name="desc"
                      placeholder="Enter description"
                      size="small"
                      fullWidth
                      value={formik.values.desc}
                      onChange={formik.handleChange}
                      error={formik.touched.desc && Boolean(formik.errors.desc)}
                      helperText={formik.touched.desc && formik.errors.desc}
                    ></TextField>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPolicy;
