import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Login from '../containers/Login';
const axios = require('axios');

class App extends Component {
constructor(props) {
  super(props);

  this.state = {
    username:"",
    password:"",
    isNew:false,
    logSuccess:false
  }

  this.userChange = this.userChange.bind(this);
  this.passChange = this.passChange.bind(this);
  this.userSubmit = this.userSubmit.bind(this);
  this.userSave = this.userSave.bind(this);
  this.handleNew = this.handleNew.bind(this);
}

handleNew(e) {
  e.preventDefault()
  this.setState({isNew:true});
}

userChange(e) {

  this.setState({username:e.target.value});
}

passChange(e) {
  this.setState({password:e.target.value});
}

userSubmit(e) {
  e.preventDefault()
  //axios.post('/confirm',{username:this.state.username,password:this.state.password})
  this.setState({logSuccess:true})

}

userSave(e) {
  e.preventDefault()
  //axios.post('/save',{username:this.state.username,password:this.state.password})
}

render() {
  return (
  <div>
    <Login userChange={this.userChange}
            passChange={this.passChange}
            userSave = {this.userSave}
            userSubmit={this.userSubmit}
            handleNew={this.handleNew}
            isNew = {this.state.isNew}
            logSuccess = {this.state.logSuccess}
            username = {this.state.username}
          />
  </div>
  )
 }
}
export default App;