import Comma from '../assets/Comma'
import Quote from '../assets/Quote'
import Apostrophie from '../assets/Apostrophie'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'
import { btnState } from './constants';

export default function typography({ symbolClickHandler }) {
    const [comma, setComma] = useState(btnState.off)
    const [quote, setQuote] = useState(btnState.on)
    const [apostrophie, setApostrophie] = useState(btnState.off)
    const [spacing, setSpacing] = useState(btnState.on)

    useEffect(() => {
        symbolClickHandler({ quote: isOn(quote), apostrophie: isOn(apostrophie), comma: isOn(comma), spacing: isOn(spacing) })
    }, [quote, apostrophie, comma, spacing])

    function commaClickHandler() {
        setComma(toggle(comma))
    }
    function quoteClickHandler() {
        setApostrophie(btnState.off)
        setQuote(toggle(quote))
    }
    function apostrophieClickHandler() {
        setQuote(btnState.off)
        setApostrophie(toggle(apostrophie))
    }
    function spacingClickHandler() {
        setSpacing(toggle(spacing))
    }
    function toggle(state) {
        return state === btnState.on ? btnState.off : btnState.on
    }
    
    return (
        <div className="typography">
            <div className="sort-by">
                <div className="label">
                    Symbols
                </div>
                <Button variant={comma} title="Comma" onClick={commaClickHandler}><Comma className="icon" /></Button>
                <Button variant={quote} title="Quote" onClick={quoteClickHandler}><Quote className="icon" /></Button>
                <Button variant={apostrophie} title="Apostrophie" onClick={apostrophieClickHandler}><Apostrophie className="icon" /></Button>
                <Button variant={spacing} onClick={spacingClickHandler} size="small" style={{ height: '2.5em' }}>spacing</Button>
            </div>
        </div>
    )
}

function isOn(state){
    return state === btnState.on
}