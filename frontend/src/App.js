import { useEffect, useState } from "react";
import axios from "axios";


const App = () => {
  const [deck, setDeck] = useState([]);
  const [drawOrder, setDrawOrder] = useState([])

  useEffect(() => {
    fetch("/api/flashcards/")
      .then((res) => (res.json())).then((data) => {
        setDeck(data);        
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    if(! drawOrder.length){
      setDrawOrder( deck.map(card => card.id))
    }
  }, [deck])


  return <h1>Redo</h1>;
};

export default App;
