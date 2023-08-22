import React, { useState } from 'react';
import { Typography, Grid } from '@mui/material';
import clsx from 'clsx';

import carouselImage1 from '../../assets/login-image-1.png';
import carouselImage2 from '../../assets/login-image-2.png';
import carouselImage3 from '../../assets/login-image-3.png';
import useStyles from './styles';

const LayoutCarousel: React.FC<unknown> = () => {
  const [shownItem, setShownItem] = useState(1);
  const classes = useStyles();

  const changeShownItem =
    (index: number) =>
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.preventDefault();
      setShownItem(index);
    };

  const carouselItem = (
    title: string,
    subtitle: string,
    index: number,
  ): JSX.Element => (
    <div hidden={shownItem !== index} className={classes.carouselItem}>
      <Grid item>
        <img
          className={classes.carouselImage}
          src={
            shownItem === 1
              ? carouselImage1
              : shownItem === 2
              ? carouselImage2
              : carouselImage3
          }
          alt="login-image"
        />
      </Grid>
      <Grid item>
        <Typography
          variant="subtitle1"
          align="center"
          className={classes.carouselTitle}
        >
          {title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          variant="body1"
          align="center"
          className={classes.carouselDescription}
        >
          {subtitle}
        </Typography>
      </Grid>
    </div>
  );

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      direction="column"
      flexGrow={1}
      className={classes.carouselContainer}
    >
      {carouselItem(
        'Lorem ipsum dolor sit amet 1',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel duis nulla cursus nullam nisi, libero. Sagittis tellus pellentesque eget malesuada. Morbi nisi in gravida vitae justo, ultrices egestas diam lacus.',
        1,
      )}
      {carouselItem(
        'Lorem ipsum dolor sit amet 2',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel duis nulla cursus nullam nisi, libero. Sagittis tellus pellentesque eget malesuada. Morbi nisi in gravida vitae justo, ultrices egestas diam lacus.',
        2,
      )}
      {carouselItem(
        'Lorem ipsum dolor sit amet 3',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel duis nulla cursus nullam nisi, libero. Sagittis tellus pellentesque eget malesuada. Morbi nisi in gravida vitae justo, ultrices egestas diam lacus.',
        3,
      )}
      <Grid item className={classes.carouselDots}>
        <div
          onClick={changeShownItem(1)}
          className={clsx(classes.carouselDot, {
            [classes.chosenDot]: shownItem === 1,
          })}
        ></div>
        <div
          onClick={changeShownItem(2)}
          className={clsx(classes.carouselDot, {
            [classes.chosenDot]: shownItem === 2,
          })}
        ></div>
        <div
          onClick={changeShownItem(3)}
          className={clsx(classes.carouselDot, {
            [classes.chosenDot]: shownItem === 3,
          })}
        ></div>
      </Grid>
    </Grid>
  );
};

export default LayoutCarousel;
