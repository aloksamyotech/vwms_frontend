import React from 'react';
import {
  Container,
  Grid,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Button,
  Typography,
  Box,
  Card
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';


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

const AddUser = () => {
  const navigate = useNavigate()
  const [isLoading , setIsLoading] = useState(false)
  return (
    <Container>
      <Typography variant="h3" style={{ marginBottom: '22px' }}>
        Add User
      </Typography>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          role: 'other',
          permissions: [{
            vehicleType: false,
            serviceList: false,
            packages: false,
            bookings: false,
            paymentTransaction: false,
            outOfService: false,
            incomeExpense: false,
            users: false,
            reports: false,
            settings: false,
            integration: false
          }]
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setIsLoading(true)
          
          axios
            .post('http://localhost:8080/user/create', values )
            .then((res) => {
            
               if (res?.data?.message == 'Already Exist') {
                toast.warning(res?.data?.message || 'Already Exist');
              } else {
                toast.success(res?.data?.message || 'user successfully created');
                navigate(`/dashboard/user/usermanagement`)
              }
              
            })
            .catch((err) => {
              console.error(`error: ${err}`);
            
            })
            setIsLoading(false)
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Card style={{ paddingTop: '15px' }}>
              <Box width="100%" padding="30px">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3}>
                    <FormLabel>Role</FormLabel>
                    <FormControl fullWidth size="small">
                      <Field name="role" as={Select} defaultValue="other" error={touched.role && !!errors.role}>
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Field>
                    </FormControl>
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
                        { label: 'Reports', name: 'reports' },
                        { label: 'Settings', name: 'settings' },
                        { label: 'Integration', name: 'integration' }
                      ].map((permission) => (
                        <Grid item xs={6} sm={4} key={permission.name}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={`permissions.${permission.name}`}
                                checked={values.permissions[permission.name]}
                                onChange={handleChange}
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
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddUser;
