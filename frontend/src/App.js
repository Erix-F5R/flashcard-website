import React, { Component } from "react";
import axios from "axios";


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
    <div>{card.word}</div>
    <div>{card.gender}</div>
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
        <div>hello</div>
        <ul>{this.renderFlashcards()}</ul>
      </main>
    );
  }
}

export default App;