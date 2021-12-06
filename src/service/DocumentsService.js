import axios from 'axios';

export class DocuementService {

    getDocuments() {

        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:3023/documentos/listar-documentos').then(response => {
                if(response.request.status !== 200){
                    reject(new Error("internal error"));
                }
                resolve(response.data.data);
            }).catch(error => {
                // Handle error.
                reject(new Error(`An error occurred:${error.response}`));
            });
        });
    }

    getDocumentById(data) {
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/documentos/obtener-documento-id',{
                id:data.id
            }).then(response => {
                if(response.request.status !== 200){
                    reject(new Error("internal error"));
                }
                resolve(response.data.data);
            }).catch(error => {
                // Handle error.
                reject(new Error(`An error occurred:${error.response}`));
            });
        });
    }

    setDocument(data){
        console.log("data->",data.title);

        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/documentos/crear', {
                titulo: data.title,
                documento: data.document,
                UsuarioId: data.userid,
                modificado_por : data.modifiedUserId
            }).then(response => {
                if(response.request.status !== 200){
                    reject(new Error("internal error"));
                }
                resolve(response.data.data);
            }).catch(error => {
                // Handle error.
                reject(new Error(`An error occurred:${error.response}`));
            });
        });
    }

    setDocumentUpdate(data){
        console.log("data->",data.title);

        return new Promise((resolve,reject) =>{
            axios.put('http://localhost:3023/documentos/update', {
                id:data.id,
                titulo: data.title,
                documento: data.document,
                UsuarioId: data.userid,
                modificado_por : data.modifiedUserId
            }).then(response => {
                if(response.request.status !== 200){
                    reject(new Error("internal error"));
                }
                resolve(response.data.data);
            }).catch(error => {
                // Handle error.
                reject(new Error(`An error occurred:${error.response}`));
            });
        });
    }

    searchDocumentByTitle(data){
        console.log("data service ->",data);
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/documentos/obtener-documento-busqueda',{
                titulo: data.title
            }).then(response => {
                if(response.request.status !== 200){
                    reject(new Error("internal error"));
                }
                resolve(response.data.data);
            }).catch(error => {
                // Handle error.
                reject(new Error(`An error occurred:${error.response}`));
            });
        });
    }

}
