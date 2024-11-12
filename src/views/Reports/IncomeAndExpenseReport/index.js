import { Stack, Button, Container, Typography, Card, Grid, Box, FormLabel, TextField } from '@mui/material';

import { Formik, Form, Field } from 'formik';

const EmailTemplates = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
        <Typography variant="h3">Income and Expense Report</Typography>
        <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}></Stack>
      </Stack>

      <Card style={{ paddingTop: '10px' }}>
        <Box width="100%" padding="30px">
          <Typography style={{ marginBottom: '15px' }} variant="h3">
            Choose Date Range
          </Typography>
          <Formik initialValues={{ startDate: '', endDate: '' }} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
              <Form>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel>Start Date</FormLabel>
                    <TextField name="startDate" type="date" size="small" fullWidth value={values.startDate} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel>End Date</FormLabel>
                    <TextField name="endDate" type="date" size="small" fullWidth value={values.endDate} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormLabel></FormLabel>
                    <Button
                      style={{
                        maxWidth: '200px',
                        maxHeight: '40px',
                        minWidth: '100px',
                        minHeight: '30px',
                        marginTop: '21px'
                      }}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Card>
    </Container>
  );
};

export default EmailTemplates;
