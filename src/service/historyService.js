import axios from 'axios';

export class HistoryService {

    getHistoriDocument(data) {
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/historial/obtener-historial-id',{
                id: data.id,
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

    setHistory(data){
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/historial/crear', {
                documentoId: data.documentoId,
                fecha: data.fecha,
                UsuarioId:data.UsuarioId
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
