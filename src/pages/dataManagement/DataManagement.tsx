import React from 'react';
import { Grid } from '@mui/material';

import { dataManagementTabsLabels } from '../../app/constants';
import Header from '../../components/Header';
import VerticalTabs from '../../components/VerticalTabs';
import Ingestors from './ingestors';
import TranslatorsPage from './translators';
import IntegrationsPage from './integrations/Integrations';
import PollableAttributesPage from './pollableAttributes/PollableAttributes';

const DataManagementPage: React.FC = () => {
  return (
    <Grid container direction="column" spacing={0}>
      <Header title="Data management" />
      <VerticalTabs
        tabs={{
          ingestors: <Ingestors />,
          translators: <TranslatorsPage />,
          integrations: <IntegrationsPage />,
          pollableAttributes: <PollableAttributesPage />,
        }}
        defaultTab="ingestors"
        tabsLabel={dataManagementTabsLabels}
      />
    </Grid>
  );
};

export default DataManagementPage;
