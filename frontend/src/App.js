import { useEffect, useState } from "react";


const App = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    fetch("/api/flashcards/")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  return <h1>Redo</h1>;
};

export default App;
