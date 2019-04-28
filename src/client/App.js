import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = { table: null };

  componentDidMount() {
    fetch('/api/getRangedData')
      .then(res => res.json())
      .then(data => this.setState({ table: data }));
  }

  createArray(table) {
    const diver = table.map(cell => <div key={cell}>{cell}</div>);
    return diver;
  }

  render() {
    const table = this.state.table;
    return (
      <div>
        {table ? (
          /* <div>{`Hello ${table}`}</div> */
          <div>{this.createArray(table)}</div>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
