import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constant";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const [restInfo, setRestInfo] = useState(null);
    const {restId} = useParams();
    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu = async () => {

        const response = await fetch(MENU_URL+restId);
    
        const json = await response.json();

        setRestInfo(json?.data);
        
    }

    if(restInfo === null){return <Shimmer/>}

    const {name, cuisines, costForTwoMessage} = restInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[7]?.card?.card;

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
            <h4>Menu</h4>
            {/* <ul>
                {itemCards.map((item) =>(
                    <li key={item.card.info.id}>
                        {item.card.info.name} : {"Rs."}{item.card.info.price /100}
                    </li>
                ))}
            </ul> */}
            
        </div>
    )
}

export default RestaurantMenu;