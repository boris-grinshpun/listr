import SortUp from '../assets/SortUp'
import SortDown from '../assets/SortDown'
import Optimize from '../assets/Optimize'
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react'

export default function sort({sortClickHandler, optimizeClickHandler, btnState}) {
    const [sortByCol, setSortByCol] = useState(btnState.off)    
    const [sortByRow, setSortByRow] = useState(btnState.off)
    const [orderUp, setOrderUp] = useState(btnState.off)  
    const [orderDown, setOrderDown] = useState(btnState.off)  
    const [optimize, setOptimize] = useState(btnState.off)    

    useEffect(()=>{
        optimizeClickHandler()
    },[optimize])
    useEffect(()=>{
        const options = {direction: null, order: null}
        if(sortByCol === btnState.on){
            options.direction = true
            options.order = orderUp === btnState.on ? true : false
        }
        if(sortByRow === btnState.on){
            options.direction = false
            options.order = orderUp === btnState.on ? true : false
        }
        sortClickHandler(options)
    },[sortByCol, sortByRow, orderUp, orderDown])
    // true - column, false - row
    function sortByClickHandler(sortBy){
        setOptimize(btnState.off)
        if (orderDown === btnState.off && orderUp === btnState.off)
            setOrderUp(btnState.on)
        
        if (sortBy){
            setSortByRow(btnState.off)
            setSortByCol(btnState.on)
            
        } else {
            setSortByRow(btnState.on)
            setSortByCol(btnState.off)
        }
    }
    // true - up, false - down 
    function orderClickHandler(direction){
        setOptimize(btnState.off)
        if (sortByCol === btnState.off && sortByRow === btnState.off)
            setSortByCol(btnState.on)
        if (direction){
            setOrderDown(btnState.off)
            setOrderUp(btnState.on)
            
        } else {
            setOrderDown(btnState.on)
            setOrderUp(btnState.off)
        }
    }
    function optimizeSelectHandler(){
        setOrderUp(btnState.off)
        setOrderDown(btnState.off)
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
                <Button variant={orderUp} title="Sort" onClick={()=>orderClickHandler(true)}>
                    <SortUp className="icon" />
                </Button>
                <Button variant={orderDown} title="Sort" onClick={()=>orderClickHandler(false)}>
                    <SortDown className="icon" />
                </Button>
            </div>
        </div>
    )
}