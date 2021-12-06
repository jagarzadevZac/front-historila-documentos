import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { DocuementService } from '../service/DocumentsService';
import { useHistory } from "react-router-dom";

export const List = () => {

    let history = useHistory();

    const handleClickGoFileForm=()=> history.push("/fileForm");
    const handleClickGoDetailsDocument=(id)=> history.push(`/file/detals/${id}`);

    const [layout, setLayout] = useState('grid');
    const sortOrder=null;
    const sortField =null;
    const [dataDocuements, setDataDocuements] = useState({});


    useEffect(() => {

        getListDocuments();

    }, []);

    const getListDocuments =async()=>{
        const docuementService = new DocuementService();

        try {
            let response = await docuementService.getDocuments();
            setDataDocuements(response);
        } catch (error) {
            console.log(error);
        }

    }


    const dataviewHeader = (
        <div className="grid grid-nogutter">
            <div className="col-6" style={{ textAlign: 'left' }}>
                <Button onClick={handleClickGoFileForm} label="New" icon="pi pi-plus" style={{ marginRight: '.5em' }} />
            </div>

            <div className="col-6" style={{ textAlign: 'right' }}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );

    const dataviewListItem = (data) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={`assets/img-txt.png`} alt="" />
                    <div className="product-list-detail">
                        <i className="pi pi-file mr-2"/>
                        <span className="font-semibold">{data.titulo}</span>
                    </div>
                    <div className="product-list-action">
                        <Button  onClick={()=>handleClickGoDetailsDocument(data.id)} label="View details" icon="pi pi-align-justify" className="p-button-success" style={{ marginRight: '.5em' }} />
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 md:col-4">
                <div className="card m-3 border-1 surface-border">
                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-file mr-2"/>
                            <span className="font-semibold">{data.titulo}</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <img src={`assets/img-txt.png`} alt=""  className="w-9 shadow-2 my-3 mx-0"/>
                    </div>
                    <div className=" text-center ">
                        <Button  onClick={()=>handleClickGoDetailsDocument(data.id)} label="View details" icon="pi pi-align-justify" className="p-button-success" style={{width: '12rem' }} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            return dataviewListItem(data);
        }
        else if (layout === 'grid') {
            return dataviewGridItem(data);
        }
    };

    return (
        <div className="grid list-demo">
            <div className="col-12">
                <div className="card">
                    <h5>List of documents</h5>
                    <DataView value={dataDocuements} layout={layout} paginator rows={5} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>
                </div>
            </div>
        </div>
    )
}
