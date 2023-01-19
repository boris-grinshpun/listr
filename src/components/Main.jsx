import { useRef, useState, useEffect } from 'react'
import Typography from './Typography';
import Sort from './Sort';
import '../styles/main.css'
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import lorem from '../lorem'
import sort from './Sort';

export default function main() {

    const [sortOptions, setSortOptions] = useState({
        direction: null, // true - up, false - down 
        order: null      // row, col
    })
    const textElement = useRef()
    const [useComma, setUseComma] = useState(false)
    const [useApostrophie, setUseApostrophie] = useState(false)
    const [useQuote, setUseQuote] = useState(false)
    const [useSpacing, setUseSpacing] = useState(false)
    const [output, setOutput] = useState("")
    const [text, setText] = useState(lorem)
    const [columns, setColumns] = useState(2)
    const [useSortBy, setSortBy] = useState(null)

    function textChangeHandler() {
        setText(textElement.current.value)
    }

    function handleChangeColumns(e, val) {
        setColumns(Number(val))
    }

    function valueColumns(value) {
        return `${value}`;
    }

    function preventHorizontalKeyboardNavigation(event) {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
        }
    }

    useEffect(() => {
        const {prepGrid , largestWordInColumn} = buildGrid({columns, text})
        const out = buildOutput({ useApostrophie, useQuote, useComma,  useSpacing, prepGrid, largestWordInColumn })
        setOutput(out)
    }, [useSpacing, useComma, useApostrophie, useQuote, columns])

    function symbolClickHandler({ quote, comma, apostrophie, spacing }) {
        if (quote)
            setUseQuote(true)
        if (!quote)
            setUseQuote(false)
        if (comma)
            setUseComma(true)
        if (!comma)
            setUseComma(false)
        if (apostrophie)
            setUseApostrophie(true)
        if (!apostrophie)
            setUseApostrophie(false)
        if (spacing)    
            setUseSpacing(true)
        if (!spacing)
            setUseSpacing(false)
    }

    function optimizeClickHandler() {

    }
    function sortClickHandler({ direction, order }) {
        setSortOptions({
            direction,
            order
        })
    }
    return (
        <div>
            <div className='wrapper'>
                <div>
                    <textarea name="text" 
                    id="text" ref={textElement} 
                    cols="100" rows="10" 
                    onChange={textChangeHandler} 
                    defaultValue={lorem}
                    ></textarea>
                </div>
                <div className="data-structure">

                    {/* <Button variant="contained" size="small">Array</Button>
                    <Button variant="outlined" size="small">Object</Button>
                    <Button variant="outlined" size="small">Variables</Button> */}
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
                            max={20}
                        />
                    </div>
                    <div className="row-two">
                        <div className="results">
                            {output}
                        </div>
                    </div>
                    <div className="row-three">
                        <Typography
                            symbolClickHandler={symbolClickHandler}
                        />

                    </div>
                    <div className="row-four">
                        <Sort
                            sortClickHandler={sortClickHandler}
                            optimizeClickHandler={optimizeClickHandler}
                        />
                    </div>
                </div >
            </div>
        </div>
    )
}

function buildGrid({text, columns}) {
    let words = text.replaceAll('\n', " ").split(" ").map(i => i.trim())
    const prepGrid = []
    let row = []
    let largestWordInColumn = []
    const devider =  columns
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
    if (row.length) {
        prepGrid.push(row)
    }
    
    return {prepGrid, largestWordInColumn}
}

function buildOutput({ useApostrophie, useQuote, useComma, useSpacing, prepGrid, largestWordInColumn }) {
    const apos = useApostrophie ? `'` : ``
    const quote = useQuote ? `"` : ``
    const comma = useComma ? `,` : ""
    return prepGrid.map((row, indexRow) => {
        return row.map((word, indexCol) => {
            let numSpaces = " "
            if (useSpacing) {
                numSpaces = " ".repeat(largestWordInColumn[indexCol] - word.length + 1)
            }
            return indexCol !== row.length - 1 ? `${apos}${quote}${word}${quote}${apos}${comma}${numSpaces}` : `${apos}${quote}${word}${quote}${apos}`
        }).join("")
    }).join(`\n`)
}