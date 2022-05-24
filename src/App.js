import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) { // initializing state
    super(props);
    this.state = {
      title: 'Employee Management System',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  fSubmit = (e) => { //preventing default form behavior
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let salary = this.refs.salary.value;

    if (this.state.act === 0) {   //adding new employee
      let data = {
        name, address, salary
      }
      datas.push(data);
    } else {                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
      datas[index].salary = salary;
    }

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();  //resetting form after submission
    this.refs.name.focus();
  }

  fRemove = (i) => {  //deleting employee
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {  //editing existing employee
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.salary.value = data.salary;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();  // focusing back to the input box
  }

  render() {   //html form 
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Employee Name" className="formField" />
          <input type="text" ref="address" placeholder="Employee Address" className="formField" />
          <input type="text" ref="salary" placeholder="Employee Salary" className="formField" />
          <button onClick={(e) => this.fSubmit(e)} className="myButton">Add Employee </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i + 1}. {data.name}, {data.address}, {data.salary}
              <button onClick={() => this.fRemove(i)} className="myListButton">Remove </button>
              <button onClick={() => this.fEdit(i)} className="myListButton">Edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
