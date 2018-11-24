import React from 'react'
import { Link } from 'react-router-dom'

import { compose } from 'recompose'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { ValidInput } from '@liquid-labs/react-validation'

import withMobileDialog from '@material-ui/core/withMobileDialog'
import withSizes from 'react-sizes'
import { withStyles } from '@material-ui/core/styles'

import { isEmail } from '@liquid-labs/validators'

import classNames from 'classnames'

// This is set in the theme JSS
const dialogPadding = 48
const portraitSidePadding = 24 // ditto
const landscapeSidePadding = 8 // this is combineReducers

const styles = {
  flushTop: {
    '&:first-child': {
      paddingTop: 0
    }
  },
  landscapePadding: {
    padding: `${landscapeSidePadding}px 0`
  }
}

const LoginBase = ({email, password, onSubmit, fullScreen, layoutDirection, logoSize, maxWidth, logoWidth, open, onInputChange, error, fieldWatcher, classes}) => {
  const commonFieldProps = {
    onInputChange : onInputChange,
    required      : true,
    gridded       : {xs : 12},
    fieldWatcher  : fieldWatcher,
    required      : true // eslint-disable-line no-dupe-keys
  };

  const logoUrl = logoSize === 'large'
    ? "https://liquid-labs.com/static/img/app/liquid-labs-login-tall.svg"
    : layoutDirection === 'portrait'
      ? "https://liquid-labs.com/static/img/landing/liquid-labs-logo-landscape.svg"
      : "https://liquid-labs.com/static/img/landing/liquid-labs-logo-portrait.svg"

  return (
    <Dialog fullScreen={fullScreen} open={true} maxWidth={maxWidth}>
      <DialogContent className={classNames(classes.flushTop, layoutDirection === 'landscape' && classes.landscapePadding)}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={0} direction={layoutDirection === 'portrait' ? 'column' : 'row'}>
            {error /* TODO: this is superceded by the core info thing */
              ? <Grid item xs={12}>
                <Typography color="error">{error.message}</Typography>
              </Grid>
              : null
            }
            <Grid item xs={layoutDirection === 'portrait' ? 12 : logoSize === 'large' ? 6 : 2} style={{textAlign: 'center'}}>
              <img style={{width: logoWidth, height: 'auto'}} src={logoUrl} />
            </Grid>
            <Grid container spacing={16} item xs={layoutDirection === 'portrait' ? 12 : logoSize === 'large' ? 6 : 10} alignContent="flex-start">
              <ValidInput
                  name="email"
                  label="Email"
                  value={email}
                  validate={isEmail}
                  {...commonFieldProps}
              />
              <ValidInput
                  name="password"
                  label="Password"
                  value={password}
                  type="password"
                  {...commonFieldProps}
              />
              <Grid item xs={12} className={null/*classes.controls*/}>
                <Button color="primary" variant="contained" style={{width: '100%'}} type="submit" disabled={!fieldWatcher.isValid()}>Log In</Button>
              </Grid>
              <Grid item xs={12}>
                <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" component={Link} to={'/pw-forget'}>Recover Password</Button>
              </Grid>
              <Grid item xs={12}>
                <Button style={{fontSize: '0.6875rem', paddingTop: '5px', paddingBottom: '5px', formHeight: '24px'}} size="small" component={Link} to={'/pw-forget'}>Register</Button>
              </Grid>
            </Grid>{/* the form container/item  */}
          </Grid>{/* the outer logo+form container */}
        </form>
      </DialogContent>
    </Dialog>
  )
}

const mapScreenSizeToType = ({ width, height }) => {
  const layoutInfo = {
    fullScreen: false,
    layoutDirection: 'portrait',
    logoSize: 'large',
    maxWidth: 'xs',
    logoWidth: '100%'
  }

  const formHeight = 260 // this is the min height of the login stuff
  const nominalSmallLogoMinHeight = 140
  const nominalSmallLogoWidth = 369
  const shortModeHeight = 300
  const intermediateHeight = 628
  const landscapeThreshold = 560
  const thinModeThreshold = 360

  if (height <= shortModeHeight) {
    layoutInfo.fullScreen = true
    if (width >= landscapeThreshold) {
      layoutInfo.layoutDirection = 'landscape'
    }
    else {
      layoutInfo.logoSize = 'small'
    }
  }
  else if (height <= intermediateHeight) {
    if (width > landscapeThreshold) {
      layoutInfo.layoutDirection = 'landscape'
      layoutInfo.maxWidth = 'md'
      if (height < formHeight + 2 * dialogPadding) {
        layoutInfo.fullScreen = true
      }
    }
    else {
      layoutInfo.logoSize = 'small'
      if (height < formHeight + nominalSmallLogoMinHeight + 2 * dialogPadding) {
        layoutInfo.fullScreen = true
      }
    }
  }
  else if (thinModeThreshold < 360) {
    layoutInfo.fullScreen = true
  }

  const windowPadding = layoutInfo.fullScreen ? 0 : dialogPadding
  if (layoutInfo.layoutDirection === 'landscape') {
    const logoSpaceWidth = (width - windowPadding*2 - landscapeSidePadding) / 2
    const logoSpaceHeight = Math.max(height - windowPadding*2, formHeight)
    const logoSpaceAspectRatio = logoSpaceWidth / logoSpaceHeight
    const logoAspectRatio = 1000/889

    if (logoSpaceAspectRatio > logoAspectRatio) {
      layoutInfo.logoWidth = `${(logoSpaceHeight * logoAspectRatio)/logoSpaceWidth*100}%`
    }
  }
  else if (layoutInfo.logoSize === 'small') {
    const availableWidth = width - windowPadding * 2 - portraitSidePadding * 2
    if (availableWidth < nominalSmallLogoWidth) {
      layoutInfo.logoWidth = `${availableWidth/nominalSmallLogoWidth*100}%`
    }
    else {
      layoutInfo.logoWidth = 'auto'
    }
  }


  return layoutInfo
}

export const Login = compose(
  withStyles(styles, { name: 'Login' }),
  withMobileDialog(),
  withSizes(mapScreenSizeToType)
)(LoginBase)
