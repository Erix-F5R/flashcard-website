import React from "react";
import styled from "styled-components";

const Leaderboard = ({ deck }) => {
  const failRate = (cor, incor) => {
    return Math.floor((incor / (cor + incor)) * 100);
  };

  const order = deck.sort(
    (a, b) =>
      failRate(a.correct_tally, a.incorrect_tally) <
      failRate(b.correct_tally, b.incorrect_tally)
  );

  return (
    <Wrapper>
    
    <RowHeader><Entry>Most difficult nouns</Entry> <Rate>(Fail Rate)</Rate></RowHeader>
      {order.map((card, index) => (
        <Row>
          <Entry>{index + 1}. {card.word} </Entry>
          <Div>.......</Div>
          <Rate> {failRate(card.correct_tally, card.incorrect_tally)}%</Rate>
        </Row>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 100px;
`;

const Row = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  font-size: 20px;
`;

const RowHeader = styled(Row)`
  font-weight: bold;
  margin: 12px 0px;
  border-bottom: 3px solid lightgrey;
`;


const Entry = styled.div``;

const Rate = styled.div``;

const Div = styled.div`
  color: grey;
  flex-grow: 2;
  text-align: right;
  padding-right: 72px;

  
`;

export default Leaderboard;
