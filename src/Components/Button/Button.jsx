import React from "react";
import s from './Button.module.css';

export default function Button(props) {
    return (
        <div className={s.container}>
            {(props.status === 0) ?
                <button className={s.button} onClick={props.start}>Start</button>
                : ''
            }

            {(props.status === 1) ?
                <div>
                    <button className={s.button} onClick={props.stop}>Stop</button>
                    <button className={s.button} onClick={props.reset}>Reset</button>
                </div> : ''
            }

            {(props.status === 2) ?
                <div>
                    <button className={s.button} onClick={props.resume}>Resume</button>
                    <button className={s.button} onClick={props.reset}>Reset</button>
                </div> : ''
            }
            
        </div>
    )
};