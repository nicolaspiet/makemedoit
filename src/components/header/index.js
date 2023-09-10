import React from "react";
import AuthHeader from "./authHeader";
import PublicHeader from "./publicHeader";
import { useSelector } from "react-redux";

const Header = () => {
    const user = useSelector(rootReducer => rootReducer.userReducer);
    return (
        <>
            {user.currentUser ? <AuthHeader /> : <PublicHeader />}
        </>
    )
}   

export default Header