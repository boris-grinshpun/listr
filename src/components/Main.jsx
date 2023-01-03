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
        setParsed(parceColRow())
        setLastAction(null)
    }, [rows])
    useEffect(() => {
        setParsed(parceColRow('col'))
        setLastAction('col')
    }, [columns])
    useEffect(() => {
        if (lastAction === 'col')
            setParsed(parceColRow('col'))
        else
            setParsed(parceColRow())
    },[text])

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

    function parceColRow(method){
        const words = text.replaceAll('\n'," ").split(" ").map(i=>i.trim())
        const devider = method === 'col' ? columns : Math.ceil(words.length / rows)
        console.log(words, columns)
        return words.reduce((acc, word, index)=>{
           if (word)
                acc += word + ','
            if ((index + 1) % devider === 0){
                acc += "\n"
            }
            return acc
        },"")

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