import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
    const {restId} = useParams();

    const restInfo = useRestaurantMenu(restId);

    const [showIndex, setShowIndex] = useState(null);

    if(restInfo === null){return <Shimmer/>}

    const {name, cuisines, costForTwoMessage} = restInfo?.cards[2]?.card?.card?.info;

    const { itemCards } = restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[7]?.card?.card;
    
    const categories = restInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
                        (c) => c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    // console.log(categories);



    return (
        <div  className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
            <p>
                 {/* category accordians */}
                {categories.map((category, index) =>
                // Controlled Component
                        (<RestaurantCategory 
                            key={category.card?.card.title} 
                            data={category.card?.card}
                            showItems={index === showIndex ? true : false}
                            setShowIndex={() => setShowIndex(index)}
                            />
                            ))}
            </p>
            
            
        </div>
    )
}

export default RestaurantMenu;