
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { DialogContent } from '@mui/material';
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
import { createVehicleType } from 'api/apis';
import { useState } from 'react';

const AddCalls = (props) => {
  const { open, handleClose, onSuccess } = props;
  const [isLoading, setIsLoading] = useState(false); 

  const validationSchema = yup.object({
    vehicleType: yup
      .string()
      .required('Vehicle Type is required')
      .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50),
    file: yup.mixed().required('Image is required'),
  });

  const initialValues = {
    vehicleType: '',
    file: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(`values`, values);

      const formData = new FormData();
      formData.append('vehicleType', values.vehicleType);
      formData.append('file', values.file);
      console.log(`formData`, formData);

      const com_url = `${url.base_url}${url.vehicle_type.create}`;

      try {
        setIsLoading(true);

        const response = await createVehicleType(com_url, formData);

        if (response) {
          await onSuccess();
          toast.success('Successfully created');
          resetForm();
          handleClose();
        } else {
          throw new Error('Creation failed');
        }
      } catch (error) {
        toast.error('Creation failed');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Add New</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12}>
                  <FormLabel>Vehicle Type Name</FormLabel>
                  <TextField
                    id="vehicleType"
                    name="vehicleType"
                    placeholder="Enter vehicle type name"
                    size="small"
                    fullWidth
                    value={formik.values?.vehicleType}
                    onChange={formik.handleChange}
                    error={formik.touched.vehicleType && Boolean(formik.errors.vehicleType)}
                    helperText={formik.touched.vehicleType && formik.errors.vehicleType}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Vehicle Image</FormLabel>
                  <TextField
                    id="file"
                    name="file"
                    size="small"
                    fullWidth
                    type="file"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      formik.setFieldValue('file', event.currentTarget.files[0]);
                    }}
                    error={formik.touched.file && Boolean(formik.errors.file)}
                    helperText={formik.touched.file && formik.errors.file}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>

        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
            color="secondary"
            disabled={isLoading} 
          >
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
      </Dialog>
    </div>
  );
};

export default AddCalls;
