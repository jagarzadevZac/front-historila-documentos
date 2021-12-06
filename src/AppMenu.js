import React, { useState , useEffect} from 'react';
import { ListBox } from 'primereact/listbox';
import { InputText } from 'primereact/inputtext';
import { DocuementService } from './service/DocumentsService';
import { useHistory } from "react-router-dom";

export const AppMenu = () => {

    const [selectedDocument, setSelectedDocument] = useState(null);
    const [search, setSearch] = useState('');
    const [documents, setdocuments] = useState({});
    const docuementService = new DocuementService();
    let history = useHistory();

    useEffect(() => {
       searchTitle();
    }, [search]);

    const searchTitle = async()=>{
        let res =await docuementService.searchDocumentByTitle({"title":search});
        if(res.length > 0){
            setdocuments(res);
        }else{
            setdocuments({});
        }
    }

    const selectDocument =(data)=>{
        if(data !== null){
            history.push(`/file/detals/${data.id}`);
        }
        setSelectedDocument(data);

    }

    return (
        <div className="layout-menu-container">
            <h5>Left Icon</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    style={{ width: '17rem' }}
                />
            </span>
            <ListBox
                value={selectedDocument}
                options={documents}
                onChange={(e) => selectDocument(e.value)}
                optionLabel="titulo"
                style={{ width: '17rem' }}
            />
        </div>
    );
}
