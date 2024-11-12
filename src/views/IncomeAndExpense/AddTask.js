import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';
import { url } from 'api/url';
import { createInAndEx } from 'api/apis';
import { useState } from 'react';

const AddTask = ({ open, handleClose, onSuccess }) => {
  const [isLoading , setIsLoading] = useState(false)
  const validationSchema = yup.object({
    description: yup
      .string()
      .required('description is required')
      .test('len', 'enter less then 50 char', (val) => val && val.length < 50),
    type: yup.string().required('type is required'),
    amount: yup.number().moreThan(0, 'Not less than zero').max(999999, 'Cannot exceed 6 digits').required('Total is required'),
    date: yup.string().required('date is required')
  });

  const initialValues = {
    type: '',
    date: '',
    description: '',
    amount: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true)
      const com_url = `${url.base_url}${url.inAndEx.create_inAndEx}`;
      const response = createInAndEx(com_url, values);
      if (response) {
        await onSuccess();
        toast.success('successfully created!');
        resetForm();
        handleClose();
      } else {
        console.error(`error: ${err}`);
        toast.warning('Not created!');
      }
      setIsLoading(false)
    }
  });

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
          <Typography variant="h6">Create Task </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Type</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="type"
                      name="type"
                      label=""
                      size="small"
                      value={formik.values.type || null}
                      onChange={formik.handleChange}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                    >
                      <MenuItem value="Income">Income</MenuItem>
                      <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.type && Boolean(formik.errors.type)}>
                      {formik.touched.type && formik.errors.type}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Date</FormLabel>
                  <TextField
                    name="date"
                    type="date"
                    fullWidth
                    size="small"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Description</FormLabel>
                  <TextField
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    label=""
                    fullWidth
                    size="small"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Amount</FormLabel>
                  <TextField
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    label=""
                    x
                    fullWidth
                    size="small"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary" disabled={isLoading}>
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

export default AddTask;
