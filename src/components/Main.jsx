import { useRef, useState, useEffect } from 'react'
import Typography from './Typography';
import Sort from './Sort';
import '../styles/main.css'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import lorem from '../lorem'

export default function main() {
    const typographyClasses = { off: "outlined", on: "contained" }
    const textElement = useRef()
    const [text, setText] = useState(lorem)
    const [grid, setGrid] = useState([])
    const [gridSpacing, setGridSpacing] = useState([])
    const [output, setOutput] = useState("")
    const [rows, setRows] = useState(5)
    const [columns, setColumns] = useState(2)
    const [lastAction, setLastAction] = useState(null)
    const typographyOptions = {
        comma: typographyClasses.off,
        quote: typographyClasses.off,
        apostrophie: typographyClasses.off
    }
    const sortOptions = {
        by: null,       // row, col
        direction: true // true - up, false - down 
    }
    const [useComma, setUseComma] = useState(false)
    const [useApostrophie, setUseApostrophie] = useState(false)
    const [useQuote, setUseQuote] = useState(false)
    const [useSpacing, setUseSpacing] = useState(false)
    const [useSortBy, setSortBy] = useState(null)

    useEffect(() => {
        parseColRow()
        setLastAction(null)
    }, [rows])
    useEffect(() => {
        parseColRow('col')
        setLastAction('col')
    }, [columns])
    useEffect(() => {
        if (lastAction === 'col') {
            parseColRow('col')
        } else {
            parseColRow()
        }
    }, [text])
    useEffect(() => {
        buildOutput()
    }, [grid, gridSpacing, useApostrophie, useComma, useQuote, useSpacing])

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
    function buildOutput() {
        const apos = useApostrophie ? `'` : ``
        const quote = useQuote ? `"` : ``
        const comma = useComma ? `,` : ""
        console.log(grid)
        let result = grid.map((row, indexRow) => {
            return row.map((word, indexCol) => {
                let numSpaces = " "
                if (useSpacing){
                    numSpaces = " ".repeat(gridSpacing[indexCol] - word.length + 1)
                }
                return indexCol !== row.length - 1 ? `${apos}${quote}${word}${quote}${apos}${comma}${numSpaces}` : `${apos}${quote}${word}${quote}${apos}`
            }).join("")
        }).join(`\n`)
        setOutput(result)
    }
    function symbolClickHandler({ quote, comma, apostrophie, spacing }) {
        if (quote === typographyClasses.on)
            setUseQuote(true)
        if (quote === typographyClasses.off)
            setUseQuote(false)
        if (comma === typographyClasses.on)
            setUseComma(true)
        if (comma === typographyClasses.off)
            setUseComma(false)
        if (apostrophie === typographyClasses.on)
            setUseApostrophie(true)
        if (apostrophie === typographyClasses.off)
            setUseApostrophie(false)
        if (spacing === typographyClasses.on)
            setUseSpacing(true)
        if (spacing === typographyClasses.off)
            setUseSpacing(false)
    }

    function optimizeClickHandler() {

    }
    function sortClickHandler(sortDirection) {

    }
    return (
        <div>
            <div className='wrapper'>
                <div>
                    <textarea name="text" id="text" ref={textElement} cols="100" rows="10" onChange={textChangeHandler} defaultValue={lorem}></textarea>
                </div>
                <div className="data-structure">

                    <Button variant="contained" size="small">Array</Button>
                    <Button variant="outlined" size="small">Object</Button>
                    <Button variant="outlined" size="small">Variables</Button>
                </div>


                <div className='results-wrapper'>
                    <div className="row-one">
                        <Slider
                            sx={{ width: 500 }}
                            value={columns}
                            getAriaValueText={valueColumns}
                            valueLabelDisplay="auto"
                            step={1}
                            onChange={handleChangeColumns}
                            marks
                            min={1}
                            max={10}
                        />
                    </div>
                    <div className="row-two">
                        <Slider
                            sx={{ height: 300 }}
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
                        <div className="results">
                            {output}
                        </div>
                    </div>
                    <div className="row-three">
                        <Typography options={typographyOptions} classes={typographyClasses} symbolClickHandler={symbolClickHandler} />
                        
                    </div>
                    <div className="row-four">
                        <Sort sortClickHandler={sortClickHandler} optimizeClickHandler={optimizeClickHandler} classes={typographyClasses} />
                    </div>
                </div >
            </div>
        </div>
    )
}