import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Button,
  Box,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { url } from 'api/url';
import { editUser } from 'api/apis';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email')
    .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50),
  password: Yup.string()
    .min(6, 'Password should be at least 6 characters')
    .test('len', 'Enter less than 50 characters', (val) => val && val.length < 50)
    .required('Password is required'),
  role: Yup.string().required('Role is required')
});

const AddUser = ({ open, handleClose, EditData, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: EditData?.name || '',
              email: EditData?.email || '',
              password: EditData?.password || '',
              role: EditData?.role || 'other',
              permissions: {
                vehicleType: EditData?.permissions?.vehicleType || false,
                serviceList: EditData?.permissions?.serviceList || false,
                packages: EditData?.permissions?.packages || false,
                bookings: EditData?.permissions?.bookings || false,
                paymentTransaction: EditData?.permissions?.paymentTransaction || false,
                outOfService: EditData?.permissions?.outOfService || false,
                incomeExpense: EditData?.permissions?.incomeExpense || false,
                users: EditData?.permissions?.users || false,
                reports: EditData?.permissions?.reports || false
              }
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              setIsLoading(true);
              const id = EditData?._id;
              const com_url = `${url.base_url}${url.user.edit}${id}`;

              const response = await editUser(com_url, values);

              if (response) {
                await onSuccess();
                resetForm();
                handleClose();
                toast.success('Successfully Updated');
              } else {
                toast.warning('Edit Failed');
              }
              setIsLoading(false);
            }}
          >
            {({ values, handleChange, errors, touched }) => (
              <Form>
                <Card style={{ paddingTop: '10px' }}>
                  <Box width="100%" padding="10px">
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormLabel>Name</FormLabel>
                        <Field
                          name="name"
                          as={TextField}
                          placeholder="Enter name of the person"
                          fullWidth
                          size="small"
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormLabel>Role</FormLabel>
                        <Field
                          name="role"
                          disabled
                          as={TextField}
                          placeholder="Role"
                          fullWidth
                          size="small"
                          error={touched.role && !!errors.role}
                          helperText={touched.role && errors.role}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormLabel component="legend" style={{ marginBottom: '20px' }}>
                          User Permissions
                        </FormLabel>
                        <Grid container spacing={3}>
                          {Object.keys(values.permissions).map((permission, index) => (
                            <Grid item xs={6} sm={4} key={index}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={`permissions.${permission}`}
                                    checked={values.permissions[permission]}
                                    onChange={handleChange}
                                  />
                                }
                                label={permission.charAt(0).toUpperCase() + permission.slice(1)}
                              />
                            </Grid>
                          ))}
                        </Grid>

                        <Grid item xs={12} container justifyContent="flex-end">
                          <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update'}
                          </Button>
                          <Button onClick={handleClose} variant="outlined" style={{ marginLeft: '10px' }} color="error">
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default AddUser;
