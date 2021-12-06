import { SelectButton } from 'primereact/selectbutton';
import React,{ useState } from 'react';
import { useHistory } from "react-router-dom";


export const ActionUserButton = ({page})=>{

    let history = useHistory();
    const [value, setValue] = useState(page);
    const options = ['Log In', 'Register'];
    const changePage =(value)=>{
        setValue(value);
        if(value === "Log In"){
            history.push("/");
        }else if (value === "Register"){
            history.push("/Register");
        }else{
            history.push("/");
        }
    }
    return(
        <div style={{alignContent:'center',textAlign:"center"}}>
            <br/>
            <SelectButton value={value} options={options} onChange={(e) => changePage(e.value)} />
        </div>
    );
}
