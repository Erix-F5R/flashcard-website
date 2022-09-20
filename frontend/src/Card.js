import React from "react";
import styled from "styled-components";

const Card = ({ currentCard, handleClick }) => {
  // console.log(currentCard)
  // { id: 2, word: "angle", gender: "m", definition: "Anglais : angle (en)", link: "https://fr.wiktionary.org/wiki/angle", correct_tally: 20, incorrect_tally: 13 }
  const prepo = currentCard.gender === "m" ? "un" : "une";

  return (
    <Wrapper>
      <Word>
        <Prepo>{prepo} </Prepo>
        <Nom>{currentCard.word}</Nom>
        <Spacer>{prepo}</Spacer>
      </Word>

      <div>
        <Button value="m" onClick={handleClick}>
          Masc
        </Button>
        <Button value="f" onClick={handleClick}>
          Fem
        </Button>
      </div>
      <AnchorSpacer>Learn more at wikitionary.org</AnchorSpacer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  border: none;
  font-size: 24px;
  margin: 6px;
  margin-bottom: 99px;
  padding: 12px 24px;
`;

const Word = styled.div`
  font-size: 48px;
  display: flex;
  margin-bottom: 24px;
`;

const Prepo = styled.div`
  visibility: hidden;
`;

const Nom = styled.div``;

const Spacer = styled.div`
  visibility: hidden;
`;

const AnchorSpacer = styled.span`
  width: 400px;
  text-align: center;
  font-size: 12px;
  text-decoration: none;
  visibility: hidden;
`;
export default Card;
