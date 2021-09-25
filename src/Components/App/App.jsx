import React, { useState } from 'react';
// import { wait } from '../../utils/wait';

import { fromEvent, interval, Observable } from 'rxjs';
import { map, buffer, filter, debounceTime } from 'rxjs/operators';

import Container from '../Container/Container';
import Display from '../Display/Display';
import Button from '../Button/Button';

function App() {
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [intrvl, setIntrvl] = useState(0);
  const [status, setStatus] = useState(0);
  const [isWait, setIsWait] = useState(false);

  function getTimeComponents(time) {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return setTime({ s: secs, m: mins, h: hours });
  };
  
  function start() {
    const startStream$ = new Observable(observer => {
      observer.next(Date.now())
    })

    startStream$.subscribe((val) => {
      setIntrvl(setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - val;
        getTimeComponents(deltaTime);
      }, 1000));
      setStatus(1)
    });
  }

  function stop() {
    const stopStream$ = new Observable(observer => {
      observer.next(intrvl)
    });
    stopStream$.subscribe((val) => {
      clearInterval(val);
      setStatus(0);
      getTimeComponents(0);
    });
  }

  function reset() {
    const resetStream$ = new Observable(observer => {
      observer.next(intrvl)
    })

    resetStream$.subscribe((val) => {
      clearInterval(val)
      getTimeComponents(0)
      start()
    })
  }
  function pause() {
    clearInterval(intrvl);
    setIsWait(true);
  }
  function wait() {
    const click$ = fromEvent(document, 'click');
    const debounce$ = click$.pipe(debounceTime(300));
    const buffered$ = click$.pipe(buffer(debounce$));
    const toLength = a => a.length;
    const clickCount$ = buffered$.pipe(map(toLength));
    const doubleClick$ = clickCount$.pipe(filter(x => x === 2));
    doubleClick$.subscribe(e => {
      if (e) {
        pause();
        if (isWait) {
          start();
          setIsWait(false);
        }
        return;
      }
      
    });
  }

  return (
    <Container>
      <h1>Hola!</h1>
      <Display time={time}/>
      <Button start={start} status={status} stop={stop} reset={reset} wait={wait}/>
    </Container>
  );
}

export default App;
