import React, { Component } from "react";
import axios from "axios";

class Leaderboard extends React.Component {
  lbrenderList() {
    let list = this.props.leaderboardList.filter(
      (item) => item.incorrect_tally > 0
    );

    return list.map((card) => (
      <li key={card.id}>
        {card.word} {card.incorrect_tally}
      </li>
    ));
  }

  render() {
    return (
      <div>
        LEADERBOARD<ul>{this.lbrenderList()}</ul>
      </div>
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

class NextButton extends React.Component {
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
    this.props.userResponse(MorF == this.state.answer);
  }

  handleNextClicked() {
    this.setState({ answerGiven: false, userResponse: null });
    this.props.index();
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
      leaderboardList: [],
      index: 0,
    };
    this.handleIndex = this.handleIndex.bind(this);
    this.handleUserResponse = this.handleUserResponse.bind(this);
  }

  //onclick next
  handleIndex() {
    console.log("next", this.state.leaderboardList[0]);
    //this.setState correct_tally here
    this.state.flashcardList.shift();
    window.localStorage.setItem(
      "deck",
      JSON.stringify(this.state.flashcardList)
    );

    //this is only to force the render method to rerun
    //this.setState({ index: this.state.index + 1 });
    this.forceUpdate()
    if (this.state.flashcardList.length === 0 ){
      this.shuffle();
    } 
  }

  shuffle(){
    
  }
  //onclick masc or fem
  handleUserResponse(correct) {
    let card = this.state.flashcardList[0];
    let lbCard = this.state.leaderboardList.find((item) => item.id === card.id);

    if (correct) {
      lbCard.correct_tally = lbCard.correct_tally + 1;
    } else {
      lbCard.incorrect_tally = lbCard.incorrect_tally + 1;
    }
    //put tally to card in django DB
    axios.put(`/api/flashcards/${card.id}/`, lbCard);
    //update local storage
    window.localStorage.setItem(
      "deck",
      JSON.stringify(this.state.flashcardList)
    ); //set Deck to local Strg
  }

  //Do I need this method or can it just be in Render?
  renderFlashcard = () => {
    let newFlashcards = this.state.flashcardList;
    let currentCard = newFlashcards[0];

    return (
      <li key={currentCard.id}>
        <Card
          index={this.handleIndex}
          flashcard={currentCard}
          userResponse={this.handleUserResponse}
        />
      </li>
    );
  };

  async componentDidMount() {
    console.log("1");

    let localStorageDeck = window.localStorage.getItem("deck");
    let backendDeck = await this.refreshList();

    //if No deck in local aka first time loading
    if (localStorageDeck === null) {
      let flashcardList = backendDeck.slice();
      let leaderboardList = backendDeck.slice();

      window.localStorage.setItem("deck", JSON.stringify(flashcardList)); //set Deck to local Strg
      this.setState({ leaderboardList, flashcardList });
    }
    //if deck exists
    else {
      this.setState({ flashcardList: JSON.parse(localStorageDeck) }); //setState(flashcardList: local)
      this.setState({ leaderboardList: backendDeck.slice() });
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
    if (this.state.flashcardList.length === 0) {
      return null;
    }
    return (
      <main className="container">
        <ul>{this.renderFlashcard()}</ul>
        <Leaderboard leaderboardList={this.state.leaderboardList} />
      </main>
    );
  }
}

export default App;
//<Leaderboard flashcardList={this.state.flashcardList}/>
