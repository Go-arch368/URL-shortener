export default function reducer(state,action){
    switch(action.type){
        case "LOGIN" :{
            return  {...state,...action.payload}
        }

        case "LOGOUT" :{
            return {...state,isLoggedIn:false,user:null}
        }
        default :{
            return {...state}
        }
    }
}