import { useContext } from "react";
import { CDN_URL } from "../utils/constant";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
    const {resData}= props;

    const {cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        sla} = resData?.info;

    const {loggedInUser} = useContext(UserContext);
    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-150 hover:bg-gray-400">
            <img
                className="rounded-lg"
                alt="res-logo"
                src={CDN_URL+
                    cloudinaryImageId
                    }
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.slaString}</h4>
            <h4>User : {loggedInUser}</h4>
        </div>
    )
}

// Higher Order Component

// input - RestaurantCard =>> RestaurantCardOpened

export const withOpenLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
            <label className="absolute bg-orange-400 text-white m-2 p-2 rounded-lg">
                Open
            </label>
            <RestaurantCard {...props} />
            </div>
        );
    };
};


export default RestaurantCard;