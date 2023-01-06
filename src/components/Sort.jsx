import SortUp from '../assets/SortUp'
import SortDown from '../assets/SortDown'
import Optimize from '../assets/Optimize'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function typography({sortClickHandler, optimizeClickHandler}) {
    const sortClass = "outlined"
    const optimizeClass = "outlined"
    return (
        <div className="typography">
            <Button variant={sortClass} title="Sort" onClick={sortClickHandler}>
                <SortUp className="icon" />
            </Button>
            <Button variant={sortClass} title="Sort" onClick={sortClickHandler}>
                <SortDown className="icon" />
            </Button>
            <Button variant={optimizeClass} title="Optimize" onClick={optimizeClickHandler}>
                <Optimize className="icon" />
            </Button>
        </div>
    )
}