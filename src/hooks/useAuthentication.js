import { UserServiceData } from "../service/UserService";

const useAuthentication = () =>{

    const login =async (loginData)=>{
        const userServiceData = new UserServiceData();

        let res =await userServiceData.loginUser(loginData);
        if(res.length > 0){
            localStorage.setItem('u',JSON.stringify(res));
            return res[0];
        }
        return false;
    };


    const isAuthenticated = () => {
        let usuario = JSON.parse(localStorage.getItem('u'));
        if (usuario){
          return true
        }else{
          return false
        }
    }

    const loggedUser = () =>{
        let usuario = JSON.parse(localStorage.getItem('u'));
        if (usuario){
          return usuario
        }else{
          return null
        }
    };

    return {login,loggedUser,isAuthenticated}
}

export default useAuthentication;
