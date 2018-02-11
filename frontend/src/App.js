import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import SwList from './SwList.js';
import PersonDetails from './PersonDetails';
import {getAllPeople, getPerson} from './ApiWrapper';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  grid: {
    width: "100%",
    margin: 0,
  },
  title: {
    textAlign: "center",
    boxSizing: "border-box",
    paddingTop: 16,
    paddingBottom: 16,
  },
  paper: {
    boxSizing: "border-box",
    paddingTop: 16,
    paddingBottom: 16,
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      person: null,
      viewingPerson: false,
      error: {
        open: false,
        message: "",
      }
    }
    this.displayUser = this.displayUser.bind(this);
    this.closeUserDialog = this.closeUserDialog.bind(this);
  }

  componentDidMount() {
    getAllPeople((people) => this.setState({
      people: [...people],
    }));
  }

  displayUser(index) {
    this.setState({
      viewingPerson: true,
    });
    getPerson(this.state.people[index].id, (person => this.setState({
      person: {
        given_name: person.given_name,
        height: person.height,
        hair_color: person.hair_color,
        birth_year: person.birth_year,
        homeworld_name: person.homeworld_name,
        film_names: person.film_names,
      },
    })));
  }

  closeUserDialog(index) {
    this.setState({
      person: null,
      viewingPerson: false,
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
          <Grid 
            container 
            className={classes.grid}
            spacing={24}
            alignItems="center"
            direction="row"
            justify="center"
          >
            <Grid item xs={12} md={8} lg={6}>
              <Paper className={classes.title} elevation={4}>
                <Typography variant="title" >
                  Star Wars API Viewer
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Paper className={classes.paper} elevation={4}>
              <SwList
                characterList={this.state.people}
                handleListItemSelect={this.displayUser.bind(this)}
              />
            </Paper>
          </Grid>
        </Grid>
        <PersonDetails
          person={this.state.person}
          open={this.state.viewingPerson}
          handleClose={this.closeUserDialog}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
