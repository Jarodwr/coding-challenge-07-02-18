import assert from 'assert';
import React from 'react';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import PersonDetails, { generateListItem } from './PersonDetails';

describe('PersonDetails', function() {
  describe('#generateListItem(primary, secondary)', function() {
    it('should return an empty listitem with blank listitemtext when blank strings are entered', function() {
      assert.deepEqual(
        generateListItem("",""),
        (    
          <ListItem>
            <ListItemText
            primary=""
            secondary=""
            />
          </ListItem>
        )
      );
    })

    it('should return a listitem with "blah" as both primary and secondary text on listitemtext when it is entered', function() {
      assert.deepEqual(
        generateListItem("blah","blah"),
        (    
          <ListItem>
            <ListItemText
            primary="blah"
            secondary="blah"
            />
          </ListItem>
        )
      );
    });

    it('should return a listitem with "tah" and "yah" listitemtext when they are entered', function() {
      assert.deepEqual(
        generateListItem("tah","yah"),
        (    
          <ListItem>
            <ListItemText
            primary="tah"
            secondary="yah"
            />
          </ListItem>
        )
      );
    });
  })
})