import axios from 'axios';

export class UserServiceData {

    regsiterUser(data) {
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/usuarios/crear',{
                nombre : data.name,
                emailId: data.email,//"jesus@sample.com",
                password: data.password ,//"abcd",
                ultimo_inicio_sesion: data.date,
                tipo_usuario: data.roll.name//"admin",
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

    loginUser(data){
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:3023/usuarios/login', {
                emailId: data.email,//"jesus@sample.com",
                password: data.password // "abcd"
            }).then(response => {
                if(response.request.status !== 200){
                    reject(new Error("internal error"));
                }
                console.log(response.data.data);
                resolve(response.data.data);
            }).catch(error => {
                // Handle error.
                reject(new Error(`An error occurred:${error.response}`));
            });
        });
    }

    sessionUserHistory(data){
        console.log(data);
        return new Promise((resolve,reject) =>{
            axios.put('http://localhost:3023/usuarios/update', {
                id: data.id ,//142,
                ultimo_inicio_sesion: data.date//"03-12-2021"
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
