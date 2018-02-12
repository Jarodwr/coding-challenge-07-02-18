import React from 'react';
import PropTypes from 'prop-types';
import List, {ListItem, ListItemText} from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = {
  progressContainer: {
    textAlign: 'center',
  },
  progress: {
    display: 'inline-block',
    padding: 100,
  }
}

//Main list component, takes a list of names and ids
const SwList = (props) => {
  const {classes} = props;
  let content = {};
  if (props.characterList.length !== 0) {
    content = props.characterList.map(function(element, index) {
      return (
        <ListItem 
          button
          key={index}
          onClick={props.handleListItemSelect.bind(this, index)}
        >
          <ListItemText primary={element.given_name} />
        </ListItem>
      );
    }.bind(this));
  } else {
    content = (
      <div className={classes.progressContainer}>
        <CircularProgress 
          className={classes.progress}
          size={70}
        />
      </div>
    )
  }

  return (
    <List component="nav">
      {content}
    </List>
  );
}

SwList.propTypes = {
  characterList: PropTypes.array.isRequired,
}

export default withStyles(styles)(SwList);