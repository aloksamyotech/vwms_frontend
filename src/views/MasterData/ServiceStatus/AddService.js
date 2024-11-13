import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormLabel, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';

const AddLead = (props) => {
  const { open, handleClose } = props;
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    serviceName: yup
      .string()
      .required('required')
      .test('len', 'enter less then 50 char', (val) => val && val.length < 50)
  });

  const initialValues = {
    serviceName: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      handleClose();
      toast.success('Lead added successfully');
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '24px'
          }}
        >
          <Typography variant="h3">Add Status</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '25px' }} variant="h4">
                Status Name
              </Typography>
              <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 5, md: 6 }} style={{ padding: '20px' }}>
                <Grid item xs={12}>
                  <FormLabel>Service Name</FormLabel>
                  <TextField
                    id="serviceName"
                    name="serviceName"
                    size="medium"
                    placeholder="Enter vehicle title"
                    maxRows={10}
                    fullWidth
                    value={formik.values.serviceName}
                    onChange={formik.handleChange}
                    error={formik.touched.serviceName && Boolean(formik.errors.serviceName)}
                    helperText={formik.touched.serviceName && formik.errors.serviceName}
                    style={{ marginBottom: '20px' }}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            style={{ padding: '10px 20px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            variant="outlined"
            color="error"
            style={{ padding: '10px 20px' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLead;
