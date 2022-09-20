import React from "react";
import styled from "styled-components";

const Leaderboard = ({ deck }) => {

    const order = deck.sort( (a,b) => a.incorrect_tally < b.incorrect_tally)

  return (
    <Wrapper>
      {order.map((card, index) => (
        <div>{index + 1}{card.word}{card.incorrect_tally}</div>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
   ;
`;

export default Leaderboard;
