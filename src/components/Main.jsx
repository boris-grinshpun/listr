import { useRef, useState, useEffect } from 'react'
import '../styles/main.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import lorem from '../lorem'


export const Main = function () {
    const textElement = useRef()
    const [text, setText] = useState(lorem)
    const [parsed, setParsed] = useState("")
    const [rows, setRows] = useState(5)
    const [columns, setColumns] = useState(5)
    const [lastAction, setLastAction] = useState(null)
    useEffect(() => {
        setParsed(parseColRow())
        setLastAction(null)
    }, [rows])
    useEffect(() => {
        setParsed(parseColRow('col'))
        setLastAction('col')
    }, [columns])
    useEffect(() => {
        if (lastAction === 'col')
            setParsed(parseColRow('col'))
        else
            setParsed(parseColRow())
    }, [text])

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

    function parseColRow(method) {
        const words = text.replaceAll('\n', " ").split(" ").map(i => i.trim())
        const grid = []
        let row = []
        let largestWordInColumn = []
        let maxWordLength = 0
        let col = 0
        const devider = method === 'col' ? columns : Math.floor(words.length / rows)
        words.forEach((word, index) => {
            row.push(word)
            let col = index % devider
            if (!largestWordInColumn[col]) {
                largestWordInColumn[col] = word.length
            } else {
                largestWordInColumn[col] = Math.max(largestWordInColumn[col], word.length)
            }
            if ((index + 1) % devider === 0) {
                grid.push(row)
                row = []
                maxWordLength = 0
            }
        })
        let result = grid.map((row, indexRow)=>{
            return row.map((word, indexCol)=>{
                let numSpaces = largestWordInColumn[indexCol] - word.length + 1
                return indexCol !== row.length - 1 ? `"${word}",${" ".repeat(numSpaces)}` : `${word}`
            }).join("")
        }).join("\n")
        console.log(result, largestWordInColumn, method)
        return result
    }
    return (
        <div>
            <div className='wrapper'>
                <div>
                    <textarea name="text" id="text" ref={textElement} cols="50" rows="20" onChange={textChangeHandler} defaultValue={lorem}></textarea>
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
                        {parsed}
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
            </div>
        </div>
    )
}