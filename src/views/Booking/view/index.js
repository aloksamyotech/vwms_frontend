import React, { useState } from 'react';
import { Button, Typography, Grid, Card, CardContent } from '@mui/material';
import PaymentDialog from '../PaymentDialog';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from './car_wash_logo.jpg';

const BookingDetails = () => {
  const location = useLocation();
  const { bookingData } = location.state || {};

  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const getSelectedDate = bookingData?.slot_time;
  const splitDate = getSelectedDate?.split(' ')[0];
  const splitTime = getSelectedDate?.split(' ')[1];

  const handleReceivePayment = () => {
    setPaymentDialogOpen(false);
  };

  const downloadInvoice = () => {
    const doc = new jsPDF('p', 'mm', [148, 210]);

    doc.addImage(logo, 'JPEG', 10, 10, 30, 15);

    doc.setFontSize(14);
    doc.setTextColor('#f44336');
    doc.text('Booking Invoice', 90, 25);

    doc.setFontSize(10);
    doc.setTextColor('#000000');

    doc.text('From: Samyotech Solutions', 10, 40);

    doc.text(`To: ${bookingData?.customerName || ''}`, 100, 40);

    doc.autoTable({
      startY: 50,
      headStyles: { fillColor: [244, 67, 54], fontSize: 10 },
      bodyStyles: { fontSize: 9 },
      margin: { top: 20, left: 10, right: 10 },
      tableWidth: 'auto',
      head: [['Field', 'Details']],
      body: [
        ['Booking Id', bookingData?.id || ''],
        ['Name', bookingData?.customerName || ''],
        ['Email', bookingData?.customerEmail || ''],
        ['Your Vehicle', bookingData?.vehicleName || ''],
        ['Booking Slot', bookingData?.slot_time || ''],
        ['Total Amount', `₹${bookingData?.totalPrice || '0'}`],
        ['PaidAmount', `₹${bookingData?.totalPaidAmount ? bookingData?.totalPaidAmount : bookingData?.advancePayment || '0'}`]
      ]
    });

    doc.setTextColor('#000000');
    doc.setFontSize(8);
    doc.text('© Vehicle Wash Management System. All rights reserved.', 14, doc.internal.pageSize.height - 10);

    doc.save('invoice.pdf');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', minHeight: '80vh', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          backgroundColor: '#1976d2',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderRadius: '8px',
          padding: '10px 20px'
        }}
      >
        <Typography variant="h6" style={{ color: 'white' }}>
          Booking Details
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => window.history.back()}
          style={{
            cursor: 'pointer',
            borderColor: 'white',
            color: 'white',
            marginLeft: '20px',
            borderRadius: '4px'
          }}
        >
          Back
        </Button>
      </div>

      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Booking Details
              </Typography>
              <Typography variant="subtitle1">Booking Id - {bookingData?.id}</Typography>
              <Typography variant="subtitle1">
                <strong>{'Selected Slot  - '}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Date - <strong>{splitDate || ''}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Time - <strong>{splitTime || ''}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Vehicle Type - <strong>{bookingData?.vehicleName || ''}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Package - <strong>{bookingData?.packageName || ''}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Booking Status - <strong>{bookingData?.serviceStatus || ''}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Assigned To -<strong>{bookingData?.employeeName ? `${bookingData.employeeName} ` : 'Not Assigned'}</strong>
              </Typography>

              <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Total Amount</Typography>
                  <Typography variant="h6">₹{bookingData?.totalPrice || 0}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Paid Amount</Typography>
                  <Typography variant="h6">
                    ₹{bookingData?.totalPaidAmount ? bookingData?.totalPaidAmount : bookingData?.advancePayment || 0}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2">Remaining Amount</Typography>
                  <Typography variant="h6">
                    ₹
                    {bookingData?.remainingAmount
                      ? bookingData?.remainingAmount
                      : bookingData?.totalPrice - bookingData?.advancePayment || 0}
                  </Typography>
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="success"
                onClick={() => setPaymentDialogOpen(true)}
                style={{ marginTop: '20px', marginRight: '10px' }}
              >
                Receive Payment
              </Button>
              <Button variant="contained" color="error" onClick={() => downloadInvoice()} style={{ marginTop: '20px' }}>
                Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Customer Info
              </Typography>
              <Typography variant="subtitle1">
                Name: <strong>{bookingData?.customerName}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Address: <strong>{bookingData?.customerAddress}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Email: <strong>{bookingData?.customerEmail}</strong>
              </Typography>
              <Typography variant="subtitle1">
                Phone: <strong>{bookingData?.customerPhone}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <PaymentDialog
        open={paymentDialogOpen}
        bookingData={bookingData}
        handleClose={() => setPaymentDialogOpen(false)}
        onPaymentReceive={handleReceivePayment}
      />
    </div>
  );
};

export default BookingDetails;
