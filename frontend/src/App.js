import { useEffect, useState } from "react";

import { shuffleArray } from "./util";
import Card from "./Card";
import CardBack from "./CardBack";
import Leaderboard from "./Leaderboard";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  const [deck, setDeck] = useState([]);
  const [drawOrder, setDrawOrder] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [verso, setVerso] = useState(false);
  const [grade, setGrade] = useState("");

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
      setGrade("correct");
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
      setGrade("incorrect");
    } else {
      const nextOrder = drawOrder.slice(1);
      console.log(nextOrder);
      setCurrentCard(deck.filter((c) => c.id === nextOrder[0])[0]);
      setDrawOrder(nextOrder);
      setGrade("");
    }
    setVerso(!verso);
  };

  return (
    <Wrapper>
      <Title>
      Liste de 1750 mots français les plus courants
      </Title>
      <GlobalStyles />
      {currentCard ? ( !verso ? (
      <>
        <Card currentCard={currentCard} handleClick={handleClick} />
        <Leaderboard deck={deck} />
      </>
      ) : (
      <>
        <CardBack
          currentCard={currentCard}
          handleClick={handleClick}
          grade={grade}
        />
        <Leaderboard deck={deck} />
      </>
      ) ) : ( "Loading..." )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width:100vw;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title =styled.div`
position: absolute;
top:0;
left:0;
font-size: 24px;
font-weight: bold;
width: 100vw;
color: grey;
padding: 5px;
border-bottom: 3px solid lightgrey;
`;

export default App;
