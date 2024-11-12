import * as React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { url } from 'api/url';
import { editPayments } from 'api/apis';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  payAmount: Yup.number()
    .min(0, 'Pay amount cannot be less than 0')
    .max(Yup.ref('remainingAmount'), 'Pay amount cannot exceed remaining amount')
    .required('Pay Amount is required')
});

const PaymentDialog = ({ open, handleClose, onPaymentReceive, bookingData }) => {
  console.log(`bookingData`, bookingData);

  const [remainingAmount, setRemainingAmount] = useState(0);
  const totalAmount = bookingData?.totalPrice || 0;
  const paidAmount = bookingData?.totalPaidAmount ? bookingData?.totalPaidAmount : bookingData?.advancePayment || 0;

  useEffect(() => {
    const amount = totalAmount - paidAmount;
    setRemainingAmount(amount);
  }, [totalAmount, paidAmount]);

  const handleConfirmPayment = async (values) => {
    const totalPaidAmount = parseInt(paidAmount) + values.payAmount;
    const id = bookingData?.paymentId;
    const paymentData = {
      paidAmount: values.payAmount,
      remainingAmount: remainingAmount,
      totalPaidAmount: totalPaidAmount
    };

    const com_url = `${url.base_url}${url.payments.edit}${id}`;
    const response = await editPayments(com_url, paymentData);
    if (response) {
      toast.success(response.data.message);
      onPaymentReceive();
    } else {
      toast.success(response.data.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Receive Payment</Typography>
        <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>

      <DialogContent>
        <Formik
          initialValues={{
            paidAmount: paidAmount,
            totalAmount: totalAmount,
            remainingAmount: remainingAmount,
            payAmount: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleConfirmPayment}
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Field
                  name="totalAmount"
                  label="Total Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={values.totalAmount}
                  disabled
                  component={TextField}
                />

                <Field
                  name="paidAmount"
                  label="Paid Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={values.paidAmount}
                  disabled
                  component={TextField}
                />

                <Field
                  name="remainingAmount"
                  label="Remaining Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={values.remainingAmount}
                  disabled
                  component={TextField}
                />

                <Field
                  name="payAmount"
                  label="Pay Amount"
                  variant="outlined"
                  placeholder="0"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={values.payAmount}
                  onChange={(e) => {
                    const value = Math.max(Number(e.target.value), 0);
                    setFieldValue('payAmount', value);
                    setRemainingAmount(values.remainingAmount - value);
                  }}
                  component={TextField}
                />
                <ErrorMessage name="payAmount" component="div" style={{ color: 'red' }} />

                <DialogActions>
                  <Button variant="contained" color="primary" type="submit">
                    Confirm Payment
                  </Button>
                  <Button variant="outlined" color="error" onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
