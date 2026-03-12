import { selectuser } from "./authSlice";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function protect({children}) {
    const user = useSelector(selectuser);
if(user===null){
    return <Navigate to = "/auth/signin"/>
}else{
    return(children)
}
}
  