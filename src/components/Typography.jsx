import Comma from '../assets/Comma'
import Quote from '../assets/Quote'
import Apostrophie from '../assets/Apostrophie'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function typography({btnState, symbolClickHandler}) {
    const [comma, setComma] = useState(btnState.off)
    const [quote, setQuote] = useState(btnState.off)
    const [apostrophie, setApostrophie] = useState(btnState.off)
    const [spacing, setSpacing] = useState(btnState.off)
    useEffect(()=>{
        symbolClickHandler({quote: quote, apostrophie: apostrophie, comma: comma, spacing: spacing})
    },[quote, apostrophie, comma, spacing])
    function commaClickHandler(){
        setComma(toggle(comma))
    }
    function quoteClickHandler(){
        if (quote === btnState.off && apostrophie === btnState.on)
            setApostrophie(toggle(apostrophie))
        setQuote(toggle(quote))
    }
    function apostrophieClickHandler(){
        if (quote === btnState.on && apostrophie === btnState.off)
            setQuote(toggle(quote))
        setApostrophie(toggle(apostrophie))
    }
    function spacingClickHandler(){
        setSpacing(toggle(spacing))
    }
    function toggle(state){
        return state === btnState.on ? btnState.off : btnState.on
    }
    return (
        <div className="typography">
            <Button variant={comma} title="Comma" onClick={commaClickHandler}><Comma className="icon" /></Button>
            <Button variant={quote} title="Quote" onClick={quoteClickHandler}><Quote className="icon" /></Button>
            <Button variant={apostrophie} title="Apostrophie" onClick={apostrophieClickHandler}><Apostrophie className="icon" /></Button>
            <Button variant={spacing} onClick={spacingClickHandler} size="small" style={{ height: '2.5em' }}>spacing</Button>
        </div>
    )
}