import React, { useState,useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useHistory } from "react-router-dom";
import { DocuementService } from  "../service/DocumentsService";
import { HistoryService } from '../service/historyService';
import { Toast } from 'primereact/toast';
import { DateLocaleMexico } from '../service/Date';

export const FileFormDocument = ()=>{

    const dateLocaleMexico = new DateLocaleMexico();
    let dateMexico = dateLocaleMexico.getDateLocale();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const toast = useRef();

    let history = useHistory();
    const handleClickGoList=()=> history.push("/list");

    const saveDocument =async()=>{
        if( title === "" || text === "" ) {
                toast.current.show({severity: 'warn', summary: 'Warning Message', detail: 'please check the fields'});
            return;
        }

        try {
            const docuementService = new DocuementService();
            let res =await docuementService.setDocument({"title": title , "document" : text,"userid":142,"modifiedUserId":142  });
            toast.current.show({severity: 'success', summary: 'successful action', detail: 'Document registration ok'});
            setText("");
            setTitle("");
            if(res.insertId > 0){
                try {
                    const historyService = new HistoryService();
                    let res2 = await historyService.setHistory({
                        "documentoId": res.insertId,
                        "fecha":  dateMexico,
                        "UsuarioId":142
                    });
                    console.log(res2);
                    toast.current.show({severity: 'success', summary: 'successful action', detail: 'History registration ok'});
                    setTimeout(() => {
                        handleClickGoList();
                    }, 3000);
                } catch (error) {
                    console.error(error);
                    toast.current.show({severity: 'error', summary: 'Error Message', detail: error});
                }
            }else{
                toast.current.show({severity: 'error', summary: 'Error Message', detail: 'no exist document id'});
            }
        } catch (error) {
            console.error("error->",error);
            toast.current.show({severity: 'error', summary: 'Error Message', detail: error});
        }

    }

    const ToolbarLeftTemplate = () => {
        return (
            <>
                <Button onClick={handleClickGoList} label="Cancel" className="p-button-danger" icon="pi pi-times " style={{ marginRight: '.5em' }} />
                <Button onClick={saveDocument} label="Save" className="p-button-success" icon="pi pi-save" style={{ marginRight: '.5em' }} />
            </>
        )
    };


    return(
        <div className="grid">
            <Toast ref={toast} ></Toast>
            <div className="col-12">
                <div className="card">
                    <h5>Document data</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="title">Title</label>
                            <InputText id="title" type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="content_of_document">Content of document</label>
                            <InputTextarea
                                id="content_of_document" rows="4"
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <ToolbarLeftTemplate />
                    </div>
                </div>
            </div>
        </div>
    );
}
