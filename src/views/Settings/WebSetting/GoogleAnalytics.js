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
              <Box width="100%" padding="30px" paddingLeft="100px" marginTop="40px">
                <Grid container spacing={6}>
                  <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 5, md: 6 }}>
                    <Grid item xs={12}>
                      <FormLabel>Service Name</FormLabel>
                      <TextField
                        id="serviceName"
                        name="serviceName"
                        size="medium"
                        placeholder="Enter vehicle title"
                        maxRows={10}
                        fullWidth
                        // value={formik.values.serviceName}
                        // onChange={formik.handleChange}
                        // error={formik.touched.serviceName && Boolean(formik.errors.serviceName)}
                        // helperText={formik.touched.serviceName && formik.errors.serviceName}
                        // style={{ marginBottom: '20px' }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container style={{ marginTop: '10px' }}>
                    <Button variant="contained" color="primary" type="submit">
                      Update Settings
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
