import SortUp from '../assets/SortUp'
import SortDown from '../assets/SortDown'
import Optimize from '../assets/Optimize'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function sort({sortClickHandler, optimizeClickHandler, btnState}) {
    const [sortByCol, setSortByCol] = useState(btnState.off)    
    const [sortByRow, setSortByRow] = useState(btnState.off)
    const [directionUp, setDirectionUp] = useState(btnState.off)  
    const [directionDown, setDirectionDown] = useState(btnState.off)  
    const [optimize, setOptimize] = useState(btnState.off)    
    // true - column, false - row
    function sortByClickHandler(sortBy){
        setOptimize(btnState.off)
        if (directionDown === btnState.off && directionUp === btnState.off)
            setDirectionUp(btnState.on)
        
        if (sortBy){
            if (sortByRow === btnState.on && sortByCol === btnState.off)
                setSortByRow(toggleButton(sortByRow))
            setSortByCol(toggleButton(sortByCol))
            
        } else {
            if (sortByCol === btnState.on && sortByRow === btnState.off)
                setSortByCol(toggleButton(sortByCol))
            setSortByRow(toggleButton(sortByRow))
        }
    }
    // true - up, false - down 
    function orderClickHandler(direction){
        setOptimize(btnState.off)
        if (sortByCol === btnState.off && sortByRow === btnState.off)
            setSortByCol(btnState.on)
        if (direction){
            if (directionDown === btnState.on && directionUp === btnState.off)
                setDirectionDown(toggleButton(directionDown))
            setDirectionUp(toggleButton(directionUp))
            
        } else {
            if (directionUp === btnState.on && directionDown === btnState.off)
                setDirectionUp(toggleButton(directionUp))
            setDirectionDown(toggleButton(directionDown))
        }
    }
    function optimizeSelectHandler(){
        setDirectionUp(btnState.off)
        setDirectionDown(btnState.off)
        setSortByCol(btnState.off)
        setSortByRow(btnState.off)
        setOptimize(toggleButton(optimize))
    }
    function toggleButton(state){
        return state === btnState.on ? btnState.off : btnState.on
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