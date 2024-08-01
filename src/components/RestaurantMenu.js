import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const {restId} = useParams();

    const restInfo = useRestaurantMenu(restId);

    if(restInfo === null){return <Shimmer/>}

    const {name, cuisines, costForTwoMessage} = restInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[7]?.card?.card;

    return (
        <div  className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
            <h4>Menu</h4>
            <ul>
                {/* {itemCards.map((item) =>(
                    <li key={item.card.info.id}>
                        {item.card.info.name} : {"Rs."}{item.card.info.price /100}
                    </li>
                ))} */}
            </ul>
            
        </div>
    )
}

export default RestaurantMenu;