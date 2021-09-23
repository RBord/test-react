import React from "react";
import s from './Display.module.css';

export default function Display(props) {
    return (
        <div className={s.display}>
            <ul className={s.list}>
                <li className={s.number}>{(props.time.h >= 10)? props.time.h : '0' + props.time.h }</li>
                <li className={s.number}>{(props.time.m >= 10)? props.time.m : '0' + props.time.m }</li>
                <li className={s.number}>{(props.time.s >= 10)? props.time.s : '0' + props.time.s }</li>
            </ul>
        </div>
    )
};