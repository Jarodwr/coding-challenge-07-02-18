import React from 'react';
import PropTypes from 'prop-types';
import List, {ListItem, ListItemText} from 'material-ui/List';

const SwList = (props) => {
  let characterList = props.characterList.map(function(element, index) {
    return (
      <ListItem 
        button
        key={index}
        onClick={props.handleListItemSelect.bind(this, index)}
      >
        <ListItemText primary={element.name} />
      </ListItem>
    );
  }.bind(this));
  return (
    <List component="nav">
      {characterList}
    </List>
  );
}

SwList.propTypes = {
  characterList: PropTypes.array.isRequired,
}

export default SwList;