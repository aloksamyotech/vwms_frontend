import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, FormLabel, Button, Box, Card } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createEmployee } from 'api/apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { url } from 'api/url';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required').max(50, 'Enter less than 50 characters'),
  lastName: Yup.string().required('Last Name is required').max(50, 'Enter less than 50 characters'),
  email: Yup.string().required('Email is required').email('Enter a valid email').max(50, 'Enter less than 50 characters'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be numeric')
    .required('Phone is required')
    .min(10, 'Must be at least 10 digits')
});

const AddUserDialog = ({ open, handleClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsLoading(true);
            try {
              const com_url = `${url.base_url}${url.employee.create}`;
              const response = await createEmployee(com_url, values);
              console.log(`response`, response);

              if (response?.data?.message === 'Already Exist') {
                toast.warning('Employee already exists');
              } else {
                toast.success('Employee successfully registered');
                onSuccess();
                handleClose();
              }
            } catch (error) {
              console.error(`error ${error}`);
              toast.warning('Employee not created');
            }
            setIsLoading(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Card style={{ paddingTop: '15px' }}>
                <Box width="100%" padding="30px">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <FormLabel>First Name</FormLabel>
                      <Field
                        name="firstName"
                        as={TextField}
                        placeholder="Enter First Name"
                        fullWidth
                        size="small"
                        error={touched.firstName && !!errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormLabel>Last Name</FormLabel>
                      <Field
                        name="lastName"
                        as={TextField}
                        placeholder="Enter Last Name"
                        fullWidth
                        size="small"
                        error={touched.lastName && !!errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormLabel>Email</FormLabel>
                      <Field
                        name="email"
                        type="email"
                        as={TextField}
                        placeholder="Enter Email"
                        fullWidth
                        size="small"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormLabel>Phone</FormLabel>
                      <Field
                        name="phone"
                        as={TextField}
                        type="text"
                        placeholder="Enter Phone"
                        fullWidth
                        size="small"
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                      </Button>
                      <Button onClick={handleClose} variant="outlined" color="error" style={{ marginLeft: '8px' }}>
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
