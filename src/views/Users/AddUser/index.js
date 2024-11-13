import React, { useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  FormLabel,
  Button,
  Box,
  Card
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { url } from 'api/url';
import { createUser } from 'api/apis';

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

const AddUser = ({ open, handleClose, onSuccess }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            role: 'employee',
            permissions: {
              vehicleType: false,
              serviceList: false,
              packages: false,
              bookings: false,
              paymentTransaction: false,
              outOfService: false,
              incomeExpense: false,
              users: false,
              reports: false
            }
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setIsLoading(true);

            try {
              const com_url = `${url.base_url}${url.user.create_user}`;

              const response = await createUser(com_url, values);

              if (response?.data?.message === 'Already Exist') {
                toast.warning(response?.data?.message || 'User already exists');
              } else {
                toast.success(response?.data?.message || 'User successfully created');
                onSuccess();
                handleClose();
              }
            } catch (error) {
              toast.error('An error occurred. Please try again later.');
              console.error('Error:', error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => (
            <Form>
              <Card style={{ paddingTop: '15px' }}>
                <Box width="100%" padding="30px">
                  <Grid container spacing={1}>
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
                      <FormLabel>Email</FormLabel>
                      <Field
                        name="email"
                        type="email"
                        as={TextField}
                        placeholder="Enter email"
                        fullWidth
                        size="small"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormLabel>Password</FormLabel>
                      <Field
                        name="password"
                        as={TextField}
                        type="password"
                        placeholder="Password"
                        fullWidth
                        size="small"
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormLabel>Role</FormLabel>
                      <Field name="role" as={TextField} value="employee" disabled fullWidth size="small" />
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel component="legend" style={{ marginBottom: '20px' }}>
                        User Permissions
                      </FormLabel>
                      <Grid container spacing={3}>
                        {[
                          { label: 'Vehicle Type', name: 'vehicleType' },
                          { label: 'Service List', name: 'serviceList' },
                          { label: 'Packages', name: 'packages' },
                          { label: 'Bookings', name: 'bookings' },
                          { label: 'Payment Transaction', name: 'paymentTransaction' },
                          { label: 'Out of Service', name: 'outOfService' },
                          { label: 'Income & Expense', name: 'incomeExpense' },
                          { label: 'Users', name: 'users' },
                          { label: 'Reports', name: 'reports' }
                        ].map((permission) => (
                          <Grid item xs={6} sm={4} key={permission.name}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={`permissions.${permission.name}`}
                                  checked={values.permissions[permission.name]}
                                  onChange={() => setFieldValue(`permissions.${permission.name}`, !values.permissions[permission.name])}
                                />
                              }
                              label={permission.label}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                      </Button>
                      <Button onClick={handleClose} variant="outlined" style={{ marginLeft: '10px' }} color="error">
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
    </Dialog>
  );
};

export default AddUser;
