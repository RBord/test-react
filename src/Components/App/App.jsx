import React, { useState } from 'react';
import { exhaustMap, fromEvent, interval, Observable, takeUntil } from 'rxjs';
import { race, first, map, repeat,buffer, filter, debounceTime, bufferCount } from 'rxjs';

import Container from '../Container/Container';
import Display from '../Display/Display';
import Button from '../Button/Button';

function App() {
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [intrvl, setIntrvl] = useState(0);
  const [status, setStatus] = useState(0);

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

  function wait() {
    const waitStream$ = new Observable(observer => {
      const clicks = fromEvent(document, 'click')
      .pipe(filter((e) => e.button === 0));
      const doubleClickDuration = 300;
      const debounce = clicks
        .pipe(debounceTime(doubleClickDuration));
      const clickLimit = clicks
        .pipe(
          bufferCount(2),
        );
      const bufferGate = race(debounce, clickLimit)
        .pipe(
          first(),
        );
      clicks
        .pipe(
          buffer(bufferGate),
          map(click => click.length))
      observer.next(clicks)
    });
    waitStream$.subscribe((val) => {
      if (val) {
        clearInterval(intrvl)
      }
    })
  }
    
  

  return (
    <Container>
      <h1>Hola!</h1>
      <Display time={time}/>
      <Button start={start} status={status} stop={stop} reset={reset} wait={wait} />
    </Container>
  );
}

export default App;
