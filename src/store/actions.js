import { useReducer } from "react";
import { globalState } from "./globalState";
const [state, dispatch] = useReducer(reducer, globalState);

export default function toggle(typographySymbol, className){
    // dispatch({type: "toggle", })
}