import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import LabeledBox from '../layouts/LabeledBox';
import commonStyles from '../layouts/commonStyles'
import { ValidInput } from '@liquid-labs/react-validation'
import { isEmail } from '@liquid-labs/validators'
import * as unoRoutes from '../../app/unoRoutes';

const SignInForm = ({email, password, onSubmit, onInputChange, error, fieldWatcher, classes}) => {
  const commonFieldProps = {
    onInputChange: onInputChange,
    required: true,
    gridded: {xs: 12},
    fieldWatcher: fieldWatcher,
    required: true // eslint-disable-line no-dupe-keys
  };

  return (
    <LabeledBox className={classes.centeredRoot} title="Sign in">
      <form onSubmit={onSubmit}>
        <Grid container spacing={16}>
          {error
            ? <Grid item xs={12}>
                <Typography color="error">{error.message}</Typography>
              </Grid>
            : null
          }
          <ValidInput
            label="Email"
            value={email}
            validate={isEmail}
            {...commonFieldProps}
          />
          <ValidInput
            label="Password"
            value={password}
            type="password"
            {...commonFieldProps}
          />
          <Grid item xs={12} className={classes.controls}>
            <Button color="primary" type="submit" disabled={!fieldWatcher.isValid()}>Sign In</Button>
          </Grid>
          <Grid item xs={12}>
            <Link to={unoRoutes.PASSWORD_FORGET}>Forgot Password?</Link>
          </Grid>
          <Grid item xs={12}>
            Need an account?
            <Link to={unoRoutes.SIGN_UP}>Sign Up</Link>
          </Grid>
        </Grid>
      </form>
    </LabeledBox>
  );
}

export default withStyles(commonStyles)(SignInForm);
