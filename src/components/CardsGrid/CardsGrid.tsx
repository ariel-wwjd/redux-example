import React from 'react';
import { Grid } from '@mui/material';
import clsx from 'clsx';

interface CardsGridProps {
  cards: JSX.Element[];
  twoColumns?: boolean;
  containerPadding?: boolean;
}

const CardsGrid: React.FC<CardsGridProps> = ({
  cards,
  twoColumns = false,
  containerPadding = true,
}) => {
  return (
    <Grid
      item
      xs={12}
      className={clsx({
        ['mb-9 px-8']: containerPadding,
      })}
    >
      <Grid container spacing={2}>
        {cards.map((card, key) => (
          <Grid
            item
            key={key}
            xs={6}
            md={twoColumns ? 6 : 4}
            lg={twoColumns ? 6 : 3}
          >
            {card}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CardsGrid;
