import React, { useState,useRef,useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useHistory } from "react-router-dom";
import { DocuementService } from  "../service/DocumentsService";
import { HistoryService } from '../service/historyService';
import { Toast } from 'primereact/toast';
import { DateLocaleMexico } from '../service/Date';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const FileDetailDocument = (props)=>{

    const { match: { params } } = props;
    let userLogInfo = JSON.parse(localStorage.getItem('u'));
    const dateLocaleMexico = new DateLocaleMexico();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const toast = useRef();
    const historyService = new HistoryService();
    const docuementService = new DocuementService();
    const [customer3, setCustomer3] = useState(null);
    const [diabled, setDiabled] = useState(true);
    const [userid, setUserid] = useState(null);
    const modifiedId = useState(userLogInfo[0].id);
    console.log(modifiedId[0]);

    let dateMexico = dateLocaleMexico.getDateLocale();
    let history = useHistory();

    const handleClickGoList=()=> history.push("/list");

    useEffect(() => {
        if(params.id){
            getHistoryDocuments();
            getDetailDocument();
        }
    },[params.id]);

    const getHistoryDocuments =async()=>{
        let dataHistory =await historyService.getHistoriDocument({"id":parseInt(params.id)});
        setCustomer3(dataHistory);
    }

    const getDetailDocument =async()=>{
        let dataDocument =await docuementService.getDocumentById({"id":parseInt(params.id)});
        if(dataDocument.length > 0){
            console.log(dataDocument);
            setText(dataDocument[0].documento);
            setTitle(dataDocument[0].titulo);
            setUserid(dataDocument[0].UsuarioId);
        }
    }

    const UpdateDocument =async()=>{
        if( title === "" || text === "" ) {
                toast.current.show({severity: 'warn', summary: 'Warning Message', detail: 'please check the fields'});
            return;
        }

        try {

            let res =await docuementService.setDocumentUpdate({
                            "id":parseInt(params.id),
                            "title": title ,
                            "document" : text,
                            "userid":userid,
                            "modifiedUserId":modifiedId[0]
                        });

            toast.current.show({severity: 'success', summary: 'successful action', detail: 'Document update ok'});
            setText("");
            setTitle("");
            console.log(res);
            if(res === "Update successful"){
                try {

                    let res2 = await historyService.setHistory({
                        "documentoId":parseInt(params.id),
                        "fecha":  dateMexico,
                        "UsuarioId":modifiedId[0]
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

    const enableEdit =()=>setDiabled(!diabled);

    const ToolbarLeftTemplate = () => {
        return (
            <>
                <Button onClick={handleClickGoList} label="Cancel" className="p-button-danger" icon="pi pi-times " style={{ marginRight: '.5em' }} />
                <Button onClick={enableEdit} label="Edit" className="p-button-warning" icon="pi pi-pencil" style={{ marginRight: '.5em' }} />
                <Button onClick={UpdateDocument} label="Save" className="p-button-success" icon="pi pi-save" style={{ marginRight: '.5em' }} />
            </>
        )
    };

    const bodyTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">{props.header}</span>
                {data[props.field]}
            </>
        );
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
                            <InputText id="title" type="text" value={title} onChange={(e)=> setTitle(e.target.value)} disabled={diabled} />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="content_of_document">Content of document</label>
                            <InputTextarea
                                id="content_of_document" rows="4"
                                value={text}
                                onChange={(e)=>setText(e.target.value)}
                                disabled={diabled}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <ToolbarLeftTemplate />
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>History of changes</h5>
                    <DataTable value={customer3} rowGroupMode="subheader" className="p-datatable-customers" groupField="representative.name" sortMode="single" sortField="representative.name" sortOrder={1}
                         scrollable scrollHeight="600px">
                        <Column field="nombre" header="Name user" body={bodyTemplate}></Column>
                        <Column field="titulo" header="Titulo" body={bodyTemplate}></Column>
                        <Column field="fecha" header="Date" body={bodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
