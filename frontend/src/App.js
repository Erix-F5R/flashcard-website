import { useEffect, useState } from "react";

import { shuffleArray } from "./util";
import Card from "./Card";
import CardBack from "./CardBack";
import Leaderboard from "./Leaderboard";

const App = () => {
  const [deck, setDeck] = useState([]);
  const [drawOrder, setDrawOrder] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [verso, setVerso] = useState(false);

  useEffect(() => {
    fetch("/api/flashcards/")
      .then((res) => res.json())
      .then((data) => setDeck(data))
      .catch((err) => console.log(err));
  }, [drawOrder]);

  useEffect(() => {
    if (!drawOrder.length) {
      const draw = shuffleArray(deck.map((card) => card.id));
      setDrawOrder(draw);
      setCurrentCard(deck.filter((c) => c.id === draw[0])[0]);
    }
  }, [deck]);

  const handleClick = (e) => {
    const answer = e.target.value;

    if (answer === currentCard.gender) {
      //correct
      fetch(`/api/flashcards/${currentCard.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentCard,
          correct_tally: currentCard.correct_tally + 1,
        }),
      });
    } else if (answer !== "next") {
      fetch(`/api/flashcards/${currentCard.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentCard,
          incorrect_tally: currentCard.incorrect_tally + 1,
        }),
      });
    } else {
      const nextOrder = drawOrder.slice(1);
      console.log(nextOrder);
      setCurrentCard(deck.filter((c) => c.id === nextOrder[0])[0]);
      setDrawOrder(nextOrder);
    }
    setVerso(!verso);
  };

  return currentCard ? (
    !verso ? (
      <>
        <Card currentCard={currentCard} handleClick={handleClick} />
        <Leaderboard deck={deck} />
      </>
    ) : (
      <>
        <CardBack currentCard={currentCard} handleClick={handleClick} />
        <Leaderboard deck={deck} />
      </>
    )
  ) : (
    "Loading..."
  );
};

export default App;
