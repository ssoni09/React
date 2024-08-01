import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

    const [btnName , setBtnName] = useState("Login");

    const onlineStatus = useOnlineStatus();
    
    return (
        <div className="flex justify-between  bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50">
            <div className="logo-container">
                <img className="w-48" src={LOGO_URL} />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online Status: {onlineStatus ? "✅" : "🔴"}
                    </li>
                    <li className="px-4">
                        <Link style={{ textDecoration: 'none' , color: 'black'}} to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link style={{ textDecoration: 'none' , color: 'black'}} to="/about">About Us</Link>
                    </li>
                    <li className="px-4">
                        <Link style={{ textDecoration: 'none' , color: 'black'}} to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-4">
                        <Link style={{ textDecoration: 'none' , color: 'black'}} to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-4 font-bold text-xl">Cart</li>

                    <button className="login"
                        onClick={
                        ()=>
                        btnName === "Login"
                            ? setBtnName("Logout")
                            : setBtnName("Login")}
                    >
                        {btnName}
                    </button>

                    <li className="px-4 ">loggedInUser</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;