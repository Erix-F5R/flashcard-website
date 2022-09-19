import { useEffect, useState } from "react";

const App = () => {

  const [deck, setDeck] = useState([]);

  useEffect(()=>{

    fetch('/api/')

  } , [])

  return (<h1>Redo</h1>)
}

export default App;