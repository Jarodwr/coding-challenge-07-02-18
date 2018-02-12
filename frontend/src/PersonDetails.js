import React from 'react';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Dialog, {
  DialogActions,
  DialogTitle,
} from 'material-ui/Dialog';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = {
  dialog: {
    paddingRight: 200,
    whiteSpace: "pre-wrap",
  },
  progress: {
    margin: 50,
  }
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

//Small helper function
export function generateListItem(primary, secondary) {
  return (
    <ListItem>
      <ListItemText
        primary={primary}
        secondary={secondary}
      />
    </ListItem>
  )
}

//Used for displaying the details of a person using material-ui dialog popup
const PersonDetails = (props) => {
  var {classes} = props;
  let content = (
    <CircularProgress className={classes.progress}/>
  );
  if (props.person) {
    content = [
      <DialogTitle>
        {props.person.given_name}
      </DialogTitle>,
      <List
        className={classes.dialog}
      >
        {generateListItem("Height", props.person.height)}
        {generateListItem("Hair Color", props.person.hair_color)}
        {generateListItem("Birth Year", props.person.birth_year)}
        {generateListItem("Name of Homeworld", props.person.homeworld_name)}
        {generateListItem("Films", props.person.film_names.join("\n"))}
      </List>
    ];
  }
  return (
    <Dialog
      open={props.open}
      transition={Transition}
      keepMounted
      onClose={props.handleClose}
    >
      {content}
      <DialogActions>
        <Button 
          onClick={props.handleClose} 
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(PersonDetails);