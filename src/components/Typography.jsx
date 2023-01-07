import Comma from '../assets/Comma'
import Quote from '../assets/Quote'
import Apostrophie from '../assets/Apostrophie'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function typography({ btnState, symbolClickHandler }) {
    const [comma, setComma] = useState(btnState.off)
    const [quote, setQuote] = useState(btnState.off)
    const [apostrophie, setApostrophie] = useState(btnState.off)
    const [spacing, setSpacing] = useState(btnState.off)
    useEffect(() => {
        symbolClickHandler({ quote: quote, apostrophie: apostrophie, comma: comma, spacing: spacing })
    }, [quote, apostrophie, comma, spacing])
    function commaClickHandler() {
        setComma(toggle(comma))
    }
    function quoteClickHandler() {
        setApostrophie(btnState.off)
        setQuote(btnState.on)
    }
    function apostrophieClickHandler() {
        setQuote(btnState.off)
        setApostrophie(btnState.on)
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