import React, { Component } from "react";
import axios from "axios";

class Leaderboard extends React.Component{

  renderList(){
    let list =  this.props.flashcardList.filter(item => item.incorrect_tally > 0);
    
    return list.map((card) => <li key={card.id}>{card.word}  {card.incorrect_tally}</li>)
    
  }

  render(){
    return(<div>LEADERBOARD<ul>{this.renderList()}</ul></div>
            
    );

  }
}

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
    this.props.userResponse(MorF == this.state.answer)

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
      index: 0,
    };
    this.handleIndex = this.handleIndex.bind(this);
    this.handleUserResponse = this.handleUserResponse.bind(this);
  }

  //onclick next
  handleIndex(){
    

    //this.setState correct_tally here
    this.setState({index: this.state.index+1})
  }

  //onclick masc or fem
  handleUserResponse(correct){
    
    let card = this.state.flashcardList[this.state.index]
    
    if(correct){
      card.correct_tally = card.correct_tally + 1  
    }
    else{
      card.incorrect_tally = card.incorrect_tally + 1
    }
    //put tally to card in django DB
    axios
        .put(`/api/flashcards/${card.id}/`, card)
        .then((res) => this.refreshList());
    //update local storage    
    window.localStorage.setItem('deck',JSON.stringify(this.state.flashcardList)) //set Deck to local Strg
        
    
  }
  
  //Do I need this method or can it just be in Render?
  renderFlashcard = () => {


    let newFlashcards = this.state.flashcardList;  
    let index = this.state.index
    let currentCard = newFlashcards[index];


    return (
      <li key={currentCard.id}>
        <Card index={this.handleIndex} flashcard={currentCard} userResponse={this.handleUserResponse} />        
      </li>
    );

  };  

  async componentDidMount() {

    let localDeck = window.localStorage.getItem('deck')    

    //if No deck in local
    if( localDeck === null){
      let flashcardList = await this.refreshList();
      window.localStorage.setItem('deck',JSON.stringify(flashcardList)) //set Deck to local Strg
      this.setState({flashcardList})
    }
    //if deck exists
    else{
      this.setState({flashcardList: JSON.parse(localDeck)})//setState(flashcardList: local) 
    }
    
  }

  refreshList = async () => {
    //axios is just fetch()
    return axios
      .get("/api/flashcards/")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  render() {
    if(this.state.flashcardList.length === 0){
      return null;
    }
    return (
      <main className="container">
        <ul>{this.renderFlashcard()}</ul>
        <Leaderboard flashcardList={this.state.flashcardList}/>
      </main>
    );
  }
}

export default App;
//<Leaderboard flashcardList={this.state.flashcardList}/>