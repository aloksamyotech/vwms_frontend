import React from 'react';
import { Container, Grid, TextField, FormLabel, Button, Card, Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  openingTime: Yup.string().required('Opening time is required'),
  closingTime: Yup.string().required('Closing time is required')
});

const SmtpConfig = () => {
  return (
    <Container>
      <Formik
        initialValues={{
          openingTime: '',
          closingTime: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form values:', values);
        }}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form>
            <Card>
              <Box width="100%" padding="40px" paddingLeft="100px" marginTop="40px">
                <Grid container spacing={6}>
                  <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 5, md: 6 }}>
                    <Grid item xs={12}>
                      <FormLabel>Opening Time</FormLabel>
                      <TextField
                        id="openingTime"
                        name="openingTime"
                        type="time"
                        size="medium"
                        fullWidth
                        value={values.openingTime}
                        onChange={handleChange}
                        error={touched.openingTime && Boolean(errors.openingTime)}
                        helperText={touched.openingTime && errors.openingTime}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormLabel>Closing Time</FormLabel>
                      <TextField
                        id="closingTime"
                        name="closingTime"
                        type="time"
                        size="medium"
                        fullWidth
                        value={values.closingTime}
                        onChange={handleChange}
                        error={touched.closingTime && Boolean(errors.closingTime)}
                        helperText={touched.closingTime && errors.closingTime}
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
