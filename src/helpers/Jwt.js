let key='acc_token'
export const setJwt =(token) =>
{
    
    localStorage.setItem(key,token);
}
export  const getJwt =   () =>{
    console.log(localStorage.getItem(key));
      return localStorage.getItem(key);
}
export const rmJwt = ()=> {
    localStorage.removeItem(key)
}