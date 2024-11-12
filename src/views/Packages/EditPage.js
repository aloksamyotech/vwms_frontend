import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import { url } from 'api/url';
import { allVehicleType, editPackage } from 'api/apis';

const AddLead = (props) => {
  const { open, handleClose, EditData, fetchData } = props;
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    type: yup.string().required('Vehicle Type is required'),
    name: yup
      .string()
      .required('Package Name is required')
      .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50),
    desc: yup
      .string()
      .required('Service is required')
      .test('len', 'Enter less than 200 characters', (val) => val && val.length < 200),
    price: yup.number().moreThan(0, 'Not less than zero').max(999999, 'Cannot exceed 6 digits').required('Total is required'),
    hours: yup.number().required('Hours are required').min(0, 'Hours cannot be negative'),
    minutes: yup.number().required('Minutes are required').min(0).max(59, 'Minutes must be less than 60')
  });

  const initialValues = {
    type: vehicleTypes?.find((i) => i?.vehicleName === EditData?.vehicleType)?._id || '',
    name: EditData?.name || '',
    price: EditData?.price || '',
    desc: EditData?.desc || '',
    hours: EditData?.hours || '0',
    minutes: EditData?.minutes || '0',
    status: EditData?.status || ''
  };
  const fetchVehicleTypes = async () => {
    const com_url = `${url.base_url}${url.vehicle_type.all}`;

    const response = await allVehicleType(com_url);
    if (response) {
      setVehicleTypes(response.data);
    } else {
      toast.error(`Fetching Error data`);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      const id = EditData?._id;
      const com_url = `${url.base_url}${url.package.edit}${id}`;
      const response = await editPackage(com_url, values);

      if (response) {
        await fetchData();
        toast.success(`Successfully Edited`);
        resetForm();
        handleClose();
      } else {
        toast.error(`Edit Failed`);
      }
      setIsLoading(false);
    }
  });
  useEffect(() => {
    fetchVehicleTypes();
  }, []);

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
          <Typography variant="h6">Edit Package</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      labelId="vehicle-type-select-label"
                      id="type"
                      name="type"
                      size="small"
                      fullWidth
                      value={formik.values.type}
                      onChange={formik.handleChange}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                    >
                      {vehicleTypes?.map((vehicle) => {
                        return (
                          <MenuItem key={vehicle?._id} value={vehicle?._id}>
                            {vehicle.vehicleName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.type && formik.errors.type}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Title</FormLabel>
                  <TextField
                    id="name"
                    name="name"
                    label=""
                    size="small"
                    placeholder="Enter vehicle title"
                    maxRows={10}
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Price</FormLabel>
                  <TextField
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Enter package price"
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

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Description</FormLabel>
                  <TextField
                    id="desc"
                    name="desc"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                    error={formik.touched.desc && Boolean(formik.errors.desc)}
                    helperText={formik.touched.desc && formik.errors.desc}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormLabel>Duration</FormLabel>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update'}
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

export default AddLead;
