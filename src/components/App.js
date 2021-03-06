import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// MATERIAL UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// COMPONENTS
import Question from './Question'
import Quiz from './Quiz';
import Login from '../containers/Login';
import Background from '../../css/brain.png'
import '../../css/styles.css'
const axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username:"",
      password:"",
      email:"",
      isNew:false,
      logSuccess:false,
      nextPageOn: false,
      quiz: {
        questions: [
          {
            question: "5 * 4 =",
            answers: [
              {
                "point": 1,
                "label": "20"
              },
              {
                "point": 0,
                "label": "10"
              },
              {
                "point": 0,
                "label": "30"
              },
              {
                "point": 0,
                "label": "25"
              },
            ]
          },
          {
            question: "5 + 5 =",
            answers: [
              {
                "point": 0,
                "label": "2345"
              },
              {
                "point": 1,
                "label": "10"
              },
              {
                "point": 0,
                "label": "999"
              },
              {
                "point": 0,
                "label": "55"
              },
            ]
          }
      ],
        index: 0,
        numberOfQuestions: 2,
        score: 0,
        solution:0,
        response:0,
        answers: [],
        completed: false,
        correct:-1
      }
    }
  }

  componentDidMount () {
    axios.get('/api/v1/fun')
      .then(res => {
        console.log('data', res.data)
        const stateNew = Object.assign({}, this.state);
        stateNew.quiz.questions = res.data;
        stateNew.quiz.numberOfQuestions = res.data.length;
        this.setState(stateNew);
      });
  }

  handleNew = (e) => {
    e.preventDefault()
    this.setState({isNew:true});
  }

  handleLogout = (e) => {
    e.preventDefault();
    this.setState({isNew:false, logSuccess:false})
  }

  userChange = (e) => {

    this.setState({username:e.target.value});
  }

  passChange = (e) => {
    this.setState({password:e.target.value});
  }

  emailChange = (e) => {
    this.setState({email:e.target.value});
  }

  userSubmit = (e) => {
    e.preventDefault()
    const headers = { 'Content-Type': 'application/json'}
    fetch('/login',{
            method:"POST",
            headers,
            body:JSON.stringify({username:this.state.username,password:this.state.password})
          })
          .then((res) => {
            if (res.status===200) this.setState({logSuccess:true})
            else {
              this.setState({username:'',password:''})
            }
          })
          .catch(err => console.log('errrrrrrrrrrorrrrrrr',err))
    }

  userSave = (e) => {
    e.preventDefault();
      const headers = { 'Content-Type': 'application/json'}
    fetch('/register',{
            method:"POST",
            headers,
            body:JSON.stringify({username:this.state.username,password:this.state.password,email:this.state.email})
          })
          .then((res) => {
            if (res.status===200) this.setState({logSuccess:true})
            else {
              this.setState({username:'',password:''})
            }
          })
          .catch(err => console.log('errrrrrrrrrrorrrrrrr',err))
    //axios.post('/save',{username:this.state.username,password:this.state.password})
  }

  nextSubmit = () => {
    const { quiz } = this.state;
    const stateNew = Object.assign({}, this.state);
    console.log('index', quiz.index)
    if (quiz.index + 1 < quiz.numberOfQuestions) {
      stateNew.quiz.index = quiz.index + 1;
      stateNew.quiz.correct = 0;
      console.log('newIndex', stateNew.quiz.index)
      this.setState(stateNew)
    } else {
      stateNew.quiz.completed = true;
      this.setState(stateNew);
    }
  }

  handleSubmit = () => {
    const { quiz } = this.state;
    console.log('resopnse, solution   ', quiz.response, quiz.solution)
    let tempState = this.state;
      if (quiz.response===quiz.solution) {
        console.log('cooorrrect')
        //when correct
        let tempScore = quiz.score + 10;
        tempState.quiz.score = tempScore;
        tempState.quiz.correct = 1;
        this.setState(tempState);
        this.setState({nextPageOn:true});

      }
      //when incorrect
      else {
        tempState.quiz.correct = 2;
        this.setState(tempState);
      }


  }

  handleAnswerSelected = (event) => {
    // const { quiz } = this.state;
    // let list = [...quiz.answers.slice(0, quiz.index),
    //             event.target.value,
    //             ...quiz.answers.slice(quiz.index + 1)]
    // this.setState({'answers': list})
    let tempState = this.state;
    tempState.quiz.response = parseInt(event.target.value);
    this.setState(tempState)
  }

  retakeQuiz = () => {
    const stateNew = Object.assign({}, this.state);
    stateNew.quiz.index = 0;
    stateNew.quiz.score = 0;
    stateNew.quiz.completed = false;
    this.setState(stateNew);
  }

  render() {
    const styles = {
      submit: {
        margin: 12
      }
    }
    return (
      <MuiThemeProvider>
      <div>
        <div className="app">
          <div className="loginWrapper">
            <Login userChange={this.userChange}
                    passChange={this.passChange}
                    emailChange={this.emailChange}
                    score={this.state.quiz.score}
                    userSave = {this.userSave}
                    userSubmit={this.userSubmit}
                    handleNew={this.handleNew}
                    handleLogout = {this.handleLogout}
                    isNew = {this.state.isNew}
                    logSuccess = {this.state.logSuccess}
                    username = {this.state.username}
                    password = {this.state.password}
                    email = {this.state.email}
                  />
          </div>
          <Quiz quiz = {this.state.quiz}
                index = {this.state.quiz.index}
                numberOfQuestions = {this.state.quiz.numberOfQuestions}
                score = {this.state.quiz.score}
                completed = {this.state.quiz.completed}
                handleAnswerSelected = {this.handleAnswerSelected}
                handleSubmit = {this.handleSubmit}
                nextSubmit = {this.nextSubmit}
                logSuccess = {this.state.logSuccess}
                retakeQuiz = {this.retakeQuiz}
                correct = {this.state.quiz.correct} />
              <img className="background" src={Background} />
        </div>
      </div>
      </MuiThemeProvider>
    )
   }
}

export default App;
