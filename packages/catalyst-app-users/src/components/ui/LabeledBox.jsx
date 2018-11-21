import React from 'react'

import classNames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root : {
    margin   : '0 auto',
    overflow : 'hidden'
  },
  innerBox : theme.mixins.gutters({
    paddingBottom : 16,
    marginTop     : theme.spacing.unit * 3,
  }),
  title : {
    backgroundColor : theme.palette.primary.light,
    color           : '#000',
    padding         : '8px'
  }
});

const LabeledBox = ({id, title, children, className, classes, ...props}) => {
  return (
    <Paper id={id} className={classNames(
      'LabeledBox',
      className,
      classes.root)}
        {...props}>
      { title
        ? <div className={classNames(
          'LabeledBoxTitle',
          classes.title)}>
          <Typography variant="display1" color="inherit">{title}</Typography>
        </div>
        : null
    }
      <div className={classes.innerBox}>
        {children}
      </div>
    </Paper>)
}

export default withStyles(styles)(LabeledBox)
