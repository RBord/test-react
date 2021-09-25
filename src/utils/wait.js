import { fromEvent, Observable, timer } from 'rxjs';
import { filter, map, debounceTime, buffer } from 'rxjs/operators';



const click$ = fromEvent(document, 'click')
click$.pipe(
    buffer(debounceTime(300)),
    map(a => a.length),
    filter(x => x === 3)
)
click$.subscribe(e => console.log('Double click!'))
// const debounce$ = click$.pipe(debounceTime(300));
// const buffered$ = click$.pipe(buffer(debounce$));
// const toLength = a => a.length;
// const clickCount$ = buffered$.pipe(map(toLength));
// const doubleClick$ = clickCount$.pipe(filter(x => x === 2));
// doubleClick$.subscribe(evt => console.log('Double click!'));