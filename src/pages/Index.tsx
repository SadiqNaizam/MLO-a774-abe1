import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsOverview from '../components/Dashboard/StatsOverview';
import LeadsTrackingChart from '../components/Dashboard/LeadsTrackingChart';
import LostLeadsPanel from '../components/Dashboard/LostLeadsPanel';

/**
 * IndexPage serves as the main dashboard overview page.
 * It utilizes the MainAppLayout to provide the overall structure (sidebar, header)
 * and populates the main content area with dashboard-specific components:
 * StatsOverview, LeadsTrackingChart, and LostLeadsPanel.
 */
const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard">
      {/* StatsOverview displays key metrics like funnel count and sources pie chart. */}
      <StatsOverview />

      {/* LeadsTrackingChart shows trends of closed/won leads over time. */}
      <LeadsTrackingChart />

      {/* LostLeadsPanel summarizes reasons for lost leads and other related metrics. */}
      <LostLeadsPanel />
    </MainAppLayout>
  );
};

export default IndexPage;
