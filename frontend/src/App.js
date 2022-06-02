import React, { Component } from "react";
import axios from "axios";

class Word extends React.Component{

  constructor(props) {
    super(props);
    this.word = this.props.flashcard.word;
    this.definition = this.props.flashcard.definition;
  }
  
  

  render(){
    return(
      <div className='word'>
        {this.props.answerGiven ? this.definition : this.word}
      </div>      
    );
  }
}

class Gender extends React.Component{
  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);  
  }

  handleClick(e){
    this.props.userResponse(this.props.gender);
  }

  render(){
    return(
      <button 
        className="gender"
        onClick={this.handleClick}
        disabled={this.props.answerGiven}
        >
        {this.props.gender}
        </button>

      
   );
  }
}

class Card extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userResponse: null,
      answer: 'F',
      answerGiven: false,
    };
    this.handleUserResponse = this.handleUserResponse.bind(this);
  }

  handleUserResponse( MorF ){
    this.setState({answerGiven: true, userResponse: MorF})
  }

  render(){

    var result = ''
    if(this.state.answerGiven && this.state.userResponse === this.state.answer){
      result = 'Correct'
    }
    else if (this.state.answerGiven){
      result = 'Incorrect'
    }

    return(
      <div className='card'>
        <Word answerGiven={this.state.answerGiven} flashcard={this.props.flashcard}/>
        {result}
        <Gender gender='M' userResponse={this.handleUserResponse} answerGiven={this.state.answerGiven}/>
        <Gender gender='F' userResponse={this.handleUserResponse} answerGiven={this.state.answerGiven}/>
      </div>
    );
  }
}




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcardList: [],
    };
  }


  renderFlashcards = () => {
    
  const newFlashcards = this.state.flashcardList;

  return newFlashcards.map((card) => (
    <li key={card.id}>
    <Card flashcard={card}/>
    </li>
  ));
  };

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/flashcards/")
      .then((res) => this.setState({ flashcardList: res.data }))
      .catch((err) => console.log(err));
  };



  render() {
    return (
      <main className="container">
        <ul>{this.renderFlashcards()}</ul>
      </main>
    );
  }
}

export default App;