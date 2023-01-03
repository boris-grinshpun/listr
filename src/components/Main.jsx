import { useRef, useState, useEffect } from 'react'
import '../styles/main.css'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';


export const Main = function () {
    const textElement = useRef()
    const [text, setText] = useState("")
    const [rows, setRows] = useState(1)
    const [columns, setColumns] = useState(1)

    function clickHandler() {
        console.log(textElement.current.value)
    }
    useEffect(() => {
        console.log(text)
        console.log(rows, columns)
    }, ['text', 'rows', 'columns']);

    function handleChangeColumns(e, val) {
        setColumns(val)
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
    const [value, setValue] = useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className='wrapper'>
                <button onClick={clickHandler}>
                    proccess
                </button>

                <div>
                    <textarea name="text" id="text" ref={textElement} cols="50" rows="20"></textarea>
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