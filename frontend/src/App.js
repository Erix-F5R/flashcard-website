import { useEffect, useState } from "react";
import axios from "axios";
import { shuffleArray } from "./util";
import Card from "./Card";
import CardBack from "./CardBack"

const App = () => {
  const [deck, setDeck] = useState([]);
  const [drawOrder, setDrawOrder] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [verso, setVerso] = useState(false);

  useEffect(() => {

    fetch("/api/flashcards/")
      .then((res) => res.json())
      .then((data) => {
        setDeck(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!drawOrder.length) {
      const draw = shuffleArray(deck.map((card) => card.id));
      setDrawOrder(draw);
      setCurrentCard(deck.filter((c) => c.id === draw[0])[0]);
    }
  }, [deck,drawOrder]);


  const handleClick = (e) => {
    const answer = e.target.value;

    if (answer === currentCard.gender) {
      //correct

    } else if(answer !== 'next')  {

    }else{

      const nextOrder = drawOrder.slice(1)
      console.log(nextOrder)
      setCurrentCard(deck.filter((c) => c.id === nextOrder[0])[0])
      setDrawOrder(nextOrder);
    }
    setVerso(!verso)
  };

  return currentCard ? (
    !verso ? (
      <Card currentCard={currentCard} handleClick={handleClick} />
    ) : (
      <CardBack currentCard={currentCard} handleClick={handleClick} />
    )
  ) : (
    "Loading..."
  );
};

export default App;
