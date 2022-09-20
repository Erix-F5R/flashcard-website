//Fisher-Yates Shuffle https://bost.ocks.org/mike/shuffle/
const shuffleArray = (array) => {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

export {shuffleArray}