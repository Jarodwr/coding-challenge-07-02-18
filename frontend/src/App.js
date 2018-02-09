import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import SwList from './SwList.js';
import PersonDetails from './PersonDetails';

import './App.css';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  grid: {
    width: "100%",
    margin: 0,
  },
  paper: {
    boxSizing: "border-box",
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 16,
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      person: null,
      viewingPerson: false,
    }
    this.getPeople = this.getPeople.bind(this);
    this.displayUser = this.displayUser.bind(this);
    this.closeUserDialog = this.closeUserDialog.bind(this);
  }

  componentDidMount() {
    this.getPeople()
  }

  displayUser(index) {
    this.setState({
      viewingPerson: true,
    })

    fetch('/api/people/' + index)
    .then((response)=>response.json())
    .then((responseJson) => {
      this.setState({
        person: {
          given_name: responseJson.given_name,
          height: responseJson.height,
          hair_color: responseJson.hair_color,
          birth_year: responseJson.birth_year,
          homeworld_name: responseJson.homeworld_name,
          films: responseJson.films,
        },
      });
      this.forceUpdate();
    });
  }

  closeUserDialog(index) {
    this.setState({
      person: null,
      viewingPerson: false,
    })
  }

  getPeople() {
    var people = [];
    fetch('/api/people/all')
    .then((response)=>response.json())
    .then((responseJson) => {
      responseJson.forEach(function(element) {
        people.push({
          given_name: element.given_name,
        });
      });
      this.setState({people: people});
      this.forceUpdate();
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Grid 
          container 
          className={classes.grid}
          spacing={24}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper} elevation={4}>
              <SwList
                characterList={this.state.people}
                handleListItemSelect={this.displayUser.bind(this)}
              />
            </Paper>
            <PersonDetails
              person={this.state.person}
              open={this.state.viewingPerson}
              handleClose={this.closeUserDialog}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
