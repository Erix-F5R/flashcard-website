import React from "react";
import styled from "styled-components";

const Card = ({ currentCard, handleClick }) => {
  // console.log(currentCard)
  // { id: 2, word: "angle", gender: "m", definition: "Anglais : angle (en)", link: "https://fr.wiktionary.org/wiki/angle", correct_tally: 20, incorrect_tally: 13 }


  return (
    <Wrapper>
      <Word>{currentCard.word}{currentCard.id}</Word>
      <Button value='m' onClick={ handleClick}>Masc</Button>
      <Button value='f' onClick={handleClick}>Fem</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px grey solid;
`;

const Word = styled.div`
  font-size: 24px;
`;

const Button = styled.button``;

export default Card;
