import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';


class App extends Component {
  
  state = {
    persons: [
      { id:'A', name: 'Rommel', age: 28},
      { id:'B', name: 'Laura', age: 26},
      { id:'C', name: 'Daniela', age: 39},
    ],
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({persons: persons});
  } 

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

     const persons = [...this.state.persons];
     persons[personIndex] = person;

     this.setState({persons: persons});

  }

  render() {

    let persons = null;
    let btnClass = '';

    if(this.state.showPersons) {
      persons = (<div >
        {this.state.persons.map((person, index) => {
          return <Person
            key={person.id}
            onClick={this.deletePersonHandler.bind(this, index)}
            name={person.name}
            age={person.age} 
            onChange={(event) => this.changeNameHandler(event, person.id)}
          />
        })}      
      </div>);
      btnClass = classes.Red;
    }

    let classesList = [];

    if(this.state.persons.length <=2) {
      classesList.push(classes.red);
    }

    if(this.state.persons.length <= 1) {
      classesList.push(classes.bold);
    }

    if(this.state.persons.length > 2) {
      classesList.push(classes.green);
    }

    return (
      
        <div className={classes.App}>
        <h1>Hi, I'm a React App!</h1>
        <h2>Rommel</h2>
        <p className={classesList.join(' ')}>This is working!</p>        
        <button 
          className={btnClass}
          //This is not efficient
          onClick={this.togglePersonsHandler}>
            Swith Name
        </button>
        {persons}
      </div>
      
    );
  }
}

export default App;
