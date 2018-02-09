import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import Slide from 'material-ui/transitions/Slide';
import { withStyles } from 'material-ui/styles';

const styles = {
  dialog: {
    paddingRight: 200,
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

//Small helper function
function generateListItem(primary, secondary) {
  return (
    <ListItem>
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </ListItem>
  )
}

const PersonDetails = (props) => {
  var {classes} = props;
  if (props.person) {
    return(
      <Dialog
        open={props.open}
        transition={Transition}
        keepMounted
        onClose={props.handleClose}
      >
        <DialogTitle>
          {props.person.given_name}
        </DialogTitle>
        <List
          className={classes.dialog}>
          {generateListItem("Height", props.person.height)}
          {generateListItem("Hair Color", props.person.hair_color)}
          {generateListItem("Birth Year", props.person.birth_year)}
          {generateListItem("Name of Homeworld", props.person.name_of_homeworld)}
          {generateListItem("Films", props.person.films)}
        </List>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return(
      <Dialog
        open={props.open}
        transition={Transition}
        keepMounted
        onClose={props.handleClose}
      >
        <CircularProgress/>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(PersonDetails);