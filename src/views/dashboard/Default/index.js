import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import EarningCardSec from './EarningCardSec';
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCardSec from './TotalOrderLineChartCardSec';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalOrderLineChartCardSec isLoading={isLoading} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <EarningCardSec isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
