import React, { Component } from "react";
import axios from "axios";

class Word extends React.Component {
  constructor(props) {
    super(props);
    this.word = this.props.flashcard.word;
    this.definition = this.props.flashcard.definition;
  }

  render() {
    return (
      <div className="word">
        {this.props.answerGiven ? this.definition : this.word}
      </div>
    );
  }
}

class GenderButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.userResponse(this.props.gender);
  }

  render() {
    return (
      <button
        className="gender-button"
        onClick={this.handleClick}
        disabled={this.props.answerGiven}
      >
        {this.props.gender}
      </button>
    );
  }
}

class NextButton extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.nextClicked(!this.props.nextClicked);
  }
  render() {
    return (
      <button
        className="next-button"
        onClick={this.handleClick}
        disabled={!this.props.answerGiven}
      >
        Next
      </button>
    );
  }


}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userResponse: null,
      answer: this.props.flashcard.gender,
      answerGiven: false,
    };
    this.handleUserResponse = this.handleUserResponse.bind(this);
    this.handleNextClicked = this.handleNextClicked.bind(this);
  }

  handleUserResponse(MorF) {
    this.setState({ answerGiven: true, userResponse: MorF });
  }

  handleNextClicked(){
    this.setState({ answerGiven: false, userResponse: null });
    this.props.index()
  }

  render() {
    var result = "";
    if (
      this.state.answerGiven &&
      this.state.userResponse === this.state.answer
    ) {
      result = "Correct";
    } else if (this.state.answerGiven) {
      result = "Incorrect";
    }

    return (
      <div className="card">
        <Word
          answerGiven={this.state.answerGiven}
          flashcard={this.props.flashcard}
        />
        {result}
        <GenderButton
          gender="m"
          userResponse={this.handleUserResponse}
          answerGiven={this.state.answerGiven}
        />
        <GenderButton
          gender="f"
          userResponse={this.handleUserResponse}
          answerGiven={this.state.answerGiven}
        />
        <NextButton
          nextClicked={this.handleNextClicked}
          answerGiven={this.state.answerGiven}
        />
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcardList: [],
      currentCard: null, 
      index: 0,
    };
    this.handleIndex = this.handleIndex.bind(this);
  }

  handleIndex(){
    this.setState({index: this.state.index+1})
  }
  
  renderFlashcards = () => {

    const newFlashcards = this.state.flashcardList;    
    let displayedCard = [];

    console.log('hello');

    for(let i = 0; i< newFlashcards.length; i++){
      if(i == this.state.index){
        //this.setState({currentCard: newFlashcards[i]});
        displayedCard.push(newFlashcards[i]);
      }
    }
    return displayedCard.map((card) => (
      <li key={card.id}>
        <Card index={this.handleIndex} flashcard={card} />
      </li>
    ));
    
    

  };


  

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    //axios is just fetch()
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
