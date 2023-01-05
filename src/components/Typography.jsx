import Comma from '../assets/Comma'
import Quote from '../assets/Quote'
import Apostrophie from '../assets/Apostrophie'
import Button from '@mui/material/Button';

import { useRef, useState, useEffect } from 'react'

export default function typography(prop) {
    const {classes, options} = prop 
    const [commaClass, setCommaClass] = useState(options.comma)
    const [quoteClass, setQuoteClass] = useState(options.quote)
    const [apostrophieClass, setApostrophieClass] = useState(options.apostrophie)

    function commaClickHandler(){
        setCommaClass(toggleClass(commaClass))
    }
    function quoteClickHandler(){
        setQuoteClass(toggleClass(quoteClass))
        if (quoteClass && apostrophieClass)
            setApostrophieClass("outlined")
    }
    function apostrophieClickHandler(){
        setApostrophieClass(toggleClass(apostrophieClass))
        if (apostrophieClass && quoteClass)
            setQuoteClass("outlined")
    }
    function toggleClass(name){
        return name === classes[0] ? classes[1] : classes[0]
    }
    return (
        <div className="typography">
            <Button variant={commaClass} title="Comma" onClick={commaClickHandler}><Comma className="icon" /></Button>
            <Button variant={quoteClass} title="Quote" onClick={quoteClickHandler}><Quote className="icon" /></Button>
            <Button variant={apostrophieClass} title="Apostrophie" onClick={apostrophieClickHandler}><Apostrophie className="icon" /></Button>
        </div>
    )
}