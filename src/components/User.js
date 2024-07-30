import { useEffect, useState } from "react";

const User = ({name}) => {
    const [count, setCount] = useState(0);
    const [count2] = useState(1);

    useEffect(() => {
        // Api Calls
    }, []);

    return <div className="user-card">
            <h1>Count = {count}</h1>
            <h1>Count2 = {count2}</h1>
            <h3>Name : {name}</h3>
            <h4>Location : Indore</h4>
            <h5>Contact : @swatisoni984</h5>
        </div>
}

export default User;