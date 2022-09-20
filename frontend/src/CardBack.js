import React from "react";
import styled from "styled-components";

const CardBack = ({ currentCard, handleClick, grade }) => {
  // console.log(currentCard)
  // { id: 2, word: "angle", gender: "m", definition: "Anglais : angle (en)", link: "https://fr.wiktionary.org/wiki/angle", correct_tally: 20, incorrect_tally: 13 }

  const prepo = currentCard.gender === "m" ? "un" : "une";

  return (
    <Wrapper>
      <Grade>{grade === "correct" ? "Correct!" : "Incorrect..."}</Grade>
      <Word>
        <Prepo>{prepo} </Prepo>
        <Nom>{currentCard.word}</Nom>
        <Spacer>{prepo}</Spacer>
      </Word>

      <Button value="next" onClick={handleClick}>
        Next Card
      </Button>
      <Definition>{currentCard.definition}</Definition>
      <Anchor href={currentCard.link}>Learn more at wikitionary.org</Anchor>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  height: 500px;
  border: 2px solid lightgrey;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  font-size: 24px;
  margin: 6px;
  padding: 12px 24px;
`;

const Definition = styled.div`
  font-style: italic;
  height: 70px;
  width: 400px;
  text-align: center;
  margin-top: 24px;
  
`;

const Anchor = styled.a`
  width: 400px;
  text-align: center;
  font-size: 12px;
  text-decoration: none;

  &:visited {
    color: blue;
  }
`;

const Grade = styled.div`
  position: absolute;
  top: 150px;
`;

const Word = styled.div`
  font-size: 48px;
  display: flex;
  margin-bottom: 24px;
`;

const Prepo = styled.div``;

const Nom = styled.div`
  margin: 0px 10px;
`;

const Spacer = styled.div`
  visibility: hidden;
`;
export default CardBack;
