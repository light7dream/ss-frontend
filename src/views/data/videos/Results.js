/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  CardContent,
  Grid,
  Card,
  makeStyles
} from '@material-ui/core';
import VideoCard from './videoCard';


const useStyles = makeStyles((theme) => ({
  root: {},
  content : {
    padding : "25px"
  },
  card : {
    marginRight : "25px"
  }
}));

function Results({ className, customers, ...rest }) {
  const classes = useStyles();

  return (
    // <Card
    //   className={clsx(classes.root, className)}
    //   {...rest}
    // > 
    //   <CardContent className={classes.content}>
          <Grid container>
          {customers.map((customer) => {
            return(
              <Grid key={customer.id} item md={2} xs = {4}>
              <VideoCard className={classes.card} key={customer.id} video = {customer} />
              </Grid>
              )
            })}
        </Grid>
    //   </CardContent>
    // </Card>
  );
}

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array
};
export default Results;
