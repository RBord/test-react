import React, {useState} from 'react';
import Container from '../Container/Container';
import Display from '../Display/Display';
import Button from '../Button/Button';

function App() {
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [intrvl, setIntrvl] = useState(0);
  const [status, setStatus] = useState(0);

  const start = () => {
    // run();
    setStatus(1);
    setIntrvl(setInterval(run, 1000));
  };

  const stop = () => {
    clearInterval(intrvl);
    setTime({ s: 0, m: 0, h: 0 });
    setStatus(0);
  }

  const reset = () => {
    clearInterval(intrvl);
    setTime({ s: 0, m: 0, h: 0 });
    setIntrvl(setInterval(run, 1000));
  }

  const resume = () => start();

 
  let updateS = time.s, updateM = time.m, updateH = time.h;

  const run = () => {
    if (updateM === 60) {
      updateH++;
      updateM = 0;
    }
    if (updateS === 60) {
      updateM++;
      updateS = 0;
    }
    updateS++;
    return setTime({ s: updateS, m: updateM, h: updateH });
  }
  return (
    <Container>
      <h1>Hola!</h1>
      <Display time={time}/>
      <Button start={start} stop={stop} reset={reset} resume={resume} status={status} />
    </Container>
  );
}

export default App;
