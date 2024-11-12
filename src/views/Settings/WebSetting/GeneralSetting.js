import React from 'react';
import { Container, Grid, TextField, FormLabel, Button, Typography, Card, Box, FormControl, Select, MenuItem } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  password: Yup.string().required('password is required'),
  confirmedPass: Yup.string().min(6, 'New Password should be at least 6 characters').required('Password is required'),
  role: Yup.string().required('Role is required')
});
const SmtpConfig = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          host: '',
          SMTPAuth: '',
          username: '',
          password: '',
          SMTPSecure: '',
          emailFrom: '',
          port: '',
          ReplyTo: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Card>
              <Box width="100%" padding="30px" >
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Host</FormLabel>
                    <Field
                      name="host"
                      as={TextField}
                      type="text"
                      placeholder="SMTP.gmail.com"
                      fullWidth
                      size="small"
                      error={touched.host && !!errors.host}
                      helperText={touched.host && errors.host}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>SMTPAuth</FormLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="SMTPAuth"
                        name="SMTPAuth"
                        label=""
                        size="small"
                        //   value={formik.values.payType || null}
                        //   onChange={formik.handleChange}
                        //   error={formik.touched.payType && Boolean(formik.errors.payType)}
                      >
                        <MenuItem value="">Select Option</MenuItem>
                        <MenuItem value="Held">Held</MenuItem>
                        <MenuItem value="Note Held">Note Held</MenuItem>
                      </Select>
                      {/* <FormHelperText error={formik.touched.payType && Boolean(formik.errors.payType)}>
                      {formik.touched.payType && formik.errors.payType}
                    </FormHelperText> */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormLabel>Username</FormLabel>
                    <Field
                      name="username"
                      as={TextField}
                      type="text"
                      placeholder="SMTP.gmail.com"
                      fullWidth
                      size="small"
                      error={touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormLabel>Password</FormLabel>
                    <Field
                      name="password"
                      as={TextField}
                      type="password"
                      placeholder="SMTP.gmail.com"
                      fullWidth
                      size="small"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>SMTPSecure</FormLabel>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="SMTPSecure"
                        name="SMTPSecure"
                        label=""
                        size="small"
                        //   value={formik.values.payType || null}
                        //   onChange={formik.handleChange}
                        //   error={formik.touched.payType && Boolean(formik.errors.payType)}
                      >
                        <MenuItem value="Planned">Planned</MenuItem>
                        <MenuItem value="Held">Held</MenuItem>
                        <MenuItem value="Note Held">Note Held</MenuItem>
                      </Select>
                      {/* <FormHelperText error={formik.touched.payType && Boolean(formik.errors.payType)}>
                      {formik.touched.payType && formik.errors.payType}
                    </FormHelperText> */}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormLabel>Port</FormLabel>
                    <Field
                      name="port"
                      as={TextField}
                      type="text"
                      placeholder="SMTP.gmail.com"
                      fullWidth
                      size="small"
                      error={touched.port && !!errors.port}
                      helperText={touched.port && errors.port}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Email From</FormLabel>
                    <Field
                      name="emailFrom"
                      as={TextField}
                      type="text"
                      placeholder="Enter Confirmed Password"
                      fullWidth
                      size="small"
                      error={touched.emailFrom && !!errors.emailFrom}
                      helperText={touched.emailFrom && errors.emailFrom}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormLabel>ReplyTo</FormLabel>
                    <Field
                      name="ReplyTo"
                      as={TextField}
                      type="text"
                      placeholder="Enter Confirmed Password"
                      fullWidth
                      size="small"
                      error={touched.ReplyTo && !!errors.ReplyTo}
                      helperText={touched.ReplyTo && errors.ReplyTo}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                    <Button style={{ marginLeft: '10px' }} variant="contained" color="primary" type="submit">
                      Test Email
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

export default SmtpConfig;
