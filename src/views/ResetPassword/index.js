import React from 'react';
import { Container, Grid, TextField, FormLabel, Button, Typography, Card, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string().required('password is required'),
  confirmedPass: Yup.string().min(6, 'New Password should be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required')
});
const ResetPassword = () => {
  return (
    <Container>
      <Typography variant="h3" style={{ marginBottom: '22px' }}>
        Reset Password
      </Typography>
      <Formik
        initialValues={{
          confirmedPass: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {}}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Card>
              <Box width="100%" padding="30px">
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={7}>
                    <FormLabel>Password</FormLabel>
                    <TextField
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      fullWidth
                      size="small"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <FormLabel>Confirmed Password</FormLabel>
                    <TextField
                      name="confirmedPass"
                      value={values.confirmedPass}
                      onChange={handleChange}
                      type="password"
                      placeholder="Enter Confirmed Password"
                      fullWidth
                      size="small"
                      error={touched.confirmedPass && !!errors.confirmedPass}
                      helperText={touched.confirmedPass && errors.confirmedPass}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Update
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

export default ResetPassword;
