import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

import LabeledBox from './LabeledBox'
import { ValidInput } from '@liquid-labs/react-validation'
import { isEmail, fieldsMatch } from '@liquid-labs/validators'

export const SignUpForm = ({
  onSubmit, onInputChange, // handling functions
  fieldWatcher,
  username, email, passwordOne, passwordTwo, // data values
  error, // error status
  classes // from 'withStyles'
  }) => {

  const commonFieldProps = {
    onInputChange: onInputChange,
    required: true,
    gridded: {xs: 12},
    fieldWatcher: fieldWatcher
  };

  return (
    <LabeledBox className={null/*classes.centeredRoot*/} title="Sign up">
      <form onSubmit={onSubmit}>
        <Grid container spacing={16}>
          {error
            ? <Grid item xs={12}>
                <Typography color="error">{error.message}</Typography>
              </Grid>
            : null
          }
          <ValidInput
            label="Full name"
            propName="username"
            value={username}
            {...commonFieldProps}
          />
          <ValidInput
            label="Email"
            value={email}
            validate={isEmail}
            {...commonFieldProps}
          />
          <ValidInput
            label="Password"
            propName="passwordOne"
            value={passwordOne}
            type="password"
            {...commonFieldProps}
          />
          <ValidInput
            label="Confirm password"
            propName="passwordTwo"
            value={passwordTwo}
            type="password"
            validate={fieldsMatch('Passwords', passwordOne)}
            {...commonFieldProps}
          />
          <Grid item xs={12} className={null/*classes.controls*/}>
            <Button color="secondary" component={Link} to={unoRoutes.SIGN_IN}>cancel</Button>
            <Button color="primary" type="submit" disabled={!fieldWatcher.isValid()}>Sign Up</Button>
          </Grid>
        </Grid>
      </form>
    </LabeledBox>
  )
}

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  passwordOne: PropTypes.string.isRequired,
  passwordTwo: PropTypes.string.isRequired,
  error: PropTypes.object
};
