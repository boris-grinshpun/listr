import { useRef, useState, useEffect } from 'react'
import '../styles/main.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import lorem from '../lorem'
import Comma from '../assets/Comma'
import Quote from '../assets/Quote'
import Apostrophie from '../assets/Apostrophie'


export const Main = function () {
    const textElement = useRef()
    const [text, setText] = useState(lorem)
    const [grid, setGrid] = useState([])
    const [gridSpacing, setGridSpacing] = useState([])
    const [output, setOutput] = useState("")
    const [rows, setRows] = useState(5)
    const [columns, setColumns] = useState(2)
    const [lastAction, setLastAction] = useState(null)
    useEffect(() => {
        parseColRow()
        setLastAction(null)
    }, [rows])
    useEffect(() => {
        parseColRow('col')
        setLastAction('col')
    }, [columns])
    useEffect(() => {
        if (lastAction === 'col'){
            parseColRow('col')
        } else {
            parseColRow()
        }
    }, [text])
    useEffect(()=>{
        buildOutput()
    },[grid, gridSpacing])

    function textChangeHandler() {
        setText(textElement.current.value)
    }

    function handleChangeColumns(e, val) {
        setColumns(Number(val))

    }
    function handleChangeRows(e, val) {
        setRows(Number(val))

    }
    function valueColumns(value) {
        return `${value}`;
    }
    function valueRows(value) {
        return `${value}`;
    }
    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }
    function addTypography(type){
        
    }
    function parseColRow(method) {
        const words = text.replaceAll('\n', " ").split(" ").map(i => i.trim())
        const prepGrid = []
        let row = []
        let largestWordInColumn = []
        const devider = method === 'col' ? columns : Math.ceil(words.length / rows)
        words.forEach((word, index) => {
            row.push(word)
            let col = index % devider
            if (!largestWordInColumn[col]) {
                largestWordInColumn[col] = word.length
            } else {
                largestWordInColumn[col] = Math.max(largestWordInColumn[col], word.length)
            }
            if ((index + 1) % devider === 0) {
                prepGrid.push(row)
                row = []
            }
        })
        if (row.length) prepGrid.push(row)
        setGrid(prepGrid)
        setGridSpacing(largestWordInColumn)
    }
    function buildOutput(typography={comma: false, apostrophie: false, quote:false}){
        let {comma, apostrophie, quote} = typography
        let result = grid.map((row, indexRow) => {
            return row.map((word, indexCol) => {
                let numSpaces = gridSpacing[indexCol] - word.length + 1
                return indexCol !== row.length - 1 ? `"${word}",${" ".repeat(numSpaces)}` : `"${word}"`
            }).join("")
        }).join("\n")
        // console.log(result, gridSpacing)
        setOutput(result)
    }
    return (
        <div>
            <div className='wrapper'>
                <div>
                    <textarea name="text" id="text" ref={textElement} cols="50" rows="20" onChange={textChangeHandler} defaultValue={lorem}></textarea>
                </div>
                <div className="data-structure">

                    <Button variant="contained" size="small">Array</Button>
                    <Button variant="outlined" size="small">Object</Button>
                    <Button variant="outlined" size="small">Variables</Button>
                </div>

                <Box sx={{ width: 300 }}>
                    <Slider
                        value={columns}
                        getAriaValueText={valueColumns}
                        valueLabelDisplay="auto"
                        step={1}
                        onChange={handleChangeColumns}
                        marks
                        min={1}
                        max={10}
                    />
                </Box>

                <div className='results-wrapper'>
                    <div className="results">
                        {output}
                    </div>

                    <Box sx={{ height: 300 }}>
                        <Stack sx={{ height: 300 }} alignItems="center" direction="column">

                            <Slider
                                orientation="vertical"
                                marks
                                value={rows}
                                step={1}
                                min={1}
                                max={10}
                                valueLabelDisplay="auto"
                                getAriaValueText={valueRows}
                                onChange={handleChangeRows}
                                onKeyDown={preventHorizontalKeyboardNavigation}
                            />
                        </Stack>
                    </Box>
                </div >
                <div className="typography">
                    <Button variant="outlined" title="Comma"><Comma className="icon" /></Button>
                    <Button variant="outlined" title="Quote"><Quote className="icon" /></Button>
                    <Button variant="outlined" title="Apostrophie"><Apostrophie className="icon" /></Button>
                </div>
            </div>
        </div>
    )
}