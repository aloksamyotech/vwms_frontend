import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Typography } from '@mui/material';
import Stripe from "./Stripe"
import Paypal from "./Paypal"
import Banktransfer from "./BankTransfer"
import Cash from "./Cash"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function PaymentSetting() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h2" style={{ marginBottom: '22px' }}>
        Payment Setting
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Stripe" {...a11yProps(0)} />
            <Tab label="Paypal" {...a11yProps(1)} />
            <Tab label="Banktransfer" {...a11yProps(2)} />
            <Tab label="Cash" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stripe/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Paypal/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Banktransfer/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Cash/>
        </CustomTabPanel>
      </Box>
    </>
  );
}
