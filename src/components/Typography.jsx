import Comma from '../assets/Comma'
import Quote from '../assets/Quote'
import Apostrophie from '../assets/Apostrophie'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function typography({classes, symbolClickHandler}) {
    const [commaClass, setCommaClass] = useState(classes.off)
    const [quoteClass, setQuoteClass] = useState(classes.off)
    const [apostrophieClass, setApostrophieClass] = useState(classes.off)
    useEffect(()=>{
        symbolClickHandler({quote: quoteClass, apostrophie: apostrophieClass, comma: commaClass})
    },[quoteClass, apostrophieClass, commaClass])
    function commaClickHandler(){
        setCommaClass(toggleClass(commaClass))
    }
    function quoteClickHandler(){
        if (quoteClass === classes.off && apostrophieClass === classes.on)
            setApostrophieClass(toggleClass(apostrophieClass))
        setQuoteClass(toggleClass(quoteClass))
    }
    function apostrophieClickHandler(){
        if (quoteClass === classes.on && apostrophieClass === classes.off)
            setQuoteClass(toggleClass(quoteClass))
        setApostrophieClass(toggleClass(apostrophieClass))
    }
    function toggleClass(name){
        return name === classes.on ? classes.off : classes.on
    }
    return (
        <div className="typography">
            <Button variant={commaClass} title="Comma" onClick={commaClickHandler}><Comma className="icon" /></Button>
            <Button variant={quoteClass} title="Quote" onClick={quoteClickHandler}><Quote className="icon" /></Button>
            <Button variant={apostrophieClass} title="Apostrophie" onClick={apostrophieClickHandler}><Apostrophie className="icon" /></Button>
        </div>
    )
}