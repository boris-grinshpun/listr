import SortUp from '../assets/SortUp'
import SortDown from '../assets/SortDown'
import Optimize from '../assets/Optimize'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function sort({sortClickHandler, optimizeClickHandler, classes}) {
    const [sortByCol, setSortByCol] = useState(classes.off)    
    const [sortByRow, setSortByRow] = useState(classes.off)
    const [directionUp, setDirectionUp] = useState(classes.off)  
    const [directionDown, setDirectionDown] = useState(classes.off)  
    const [optimize, setOptimize] = useState(classes.off)    
    // true - column, false - row
    function sortByClickHandler(sortBy){
        setOptimize(classes.off)
        if (directionDown === classes.off && directionUp === classes.off)
        setDirectionUp(classes.on)
        if (sortBy){
            if (sortByRow === classes.on && sortByCol === classes.off)
                setSortByRow(toggleButton(sortByRow))
            setSortByCol(toggleButton(sortByCol))
            
        } else {
            if (sortByCol === classes.on && sortByRow === classes.off)
                setSortByCol(toggleButton(sortByCol))
            setSortByRow(toggleButton(sortByRow))
        }
    }
    // true - up, false - down 
    function orderClickHandler(direction){
        setOptimize(classes.off)
        if (sortByCol === classes.off && sortByRow === classes.off)
            setSortByCol(classes.on)
        if (direction){
            if (directionDown === classes.on && directionUp === classes.off)
                setDirectionDown(toggleButton(directionDown))
            setDirectionUp(toggleButton(directionUp))
            
        } else {
            if (directionUp === classes.on && directionDown === classes.off)
                setDirectionUp(toggleButton(directionUp))
            setDirectionDown(toggleButton(directionDown))
        }
    }
    function optimizeSelectHandler(){
        setDirectionUp(classes.off)
        setDirectionDown(classes.off)
        setSortByCol(classes.off)
        setSortByRow(classes.off)
        setOptimize(toggleButton(optimize))
    }
    function toggleButton(btnState){
        return btnState === classes.on ? classes.off : classes.on
    }
    return (
        <div className="sort">
            <div className="sort-by">
                <div className="label">
                    Sort by
                </div>
                <Button variant={sortByCol} onClick={()=>sortByClickHandler(true)} size="small" style={{ height: '2.5em' }}>Column</Button>
                <Button variant={sortByRow} onClick={()=>sortByClickHandler(false)}  size="small" style={{ height: '2.5em' }}>Row</Button>
                <Button variant={optimize} title="Optimize" onClick={optimizeSelectHandler} >
                    <Optimize className="icon" /> 
                </Button>

            </div>
            <div className="direction">
                <div className="label">
                   Direction
                </div>
                <Button variant={directionUp} title="Sort" onClick={()=>orderClickHandler(true)}>
                    <SortUp className="icon" />
                </Button>
                <Button variant={directionDown} title="Sort" onClick={()=>orderClickHandler(false)}>
                    <SortDown className="icon" />
                </Button>
            </div>
        </div>
    )
}