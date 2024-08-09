import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import RestaurantCard, { withOpenLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
    const [listOfRestaurants,setListOfRestaurants]=useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardOpened = withOpenLabel(RestaurantCard);

    // Whenever state variable update, react trigger a reconciliation cycle (re-render the component )
    // console.log("Body Rendered", listOfRestaurants);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();
        console.log(json);

        //Optional Rendering
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        // console.log(listOfRestaurants)
    }

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
        return (
        <h1>
            Looks like you're offline!! Please check your internet connection;
        </h1>
    );

    const { loggedInUser, setUserName } = useContext(UserContext);


    return listOfRestaurants.length === 0 ? (<Shimmer />) : (
        <div className="body">
                <div className="filter flex">

                    <div className="search m-4 p-4">
                        <input
                            type="text"
                            value={searchText}
                            className="border border-solid border-black"
                            onChange={(e) =>{
                                setSearchText(e.target.value)
                            }}
                            />

                        <button
                            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                            onClick={() => {
                            //Filter the restaurant card and update the UI
                            //searchText
                            //console.log({searchText})

                            const filteredRestaurant = listOfRestaurants.filter(
                                (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );

                            setFilteredRestaurant(filteredRestaurant);
                        }}>Search</button>
                    </div>

                    <div className="search m-4 p-4 flex items-center">
                        <button
                            className="px-4 py-2 bg-gray-100 rounded-lg"
                            onClick={() => {
                                const filterdList = listOfRestaurants.filter(
                                    (res) => res.info.avgRating > 4
                                );
                                setFilteredRestaurant(filterdList)
                            }}>
                            Top Rated Restaurants
                        </button>
                    </div>
                    <div className="search m-4 p-4 flex items-center">
                            <label>UserName : </label>
                            <input
                                className="border border-black p-2"
                                value={loggedInUser}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                    </div>
                </div>
                
                <div className="flex flex-wrap">
                    {filteredRestaurant.map(restaurant => (
                        <Link
                        to={"/restaurant/"+restaurant.info.id} 
                        key={restaurant.info.id}>
                            {
                                restaurant.info.isOpen ? (
                                    <RestaurantCardOpened resData={restaurant}/>
                                ) : (
                                    <RestaurantCard resData={restaurant}/>
                                )
                            }
                        </Link>
                        
                    )

                    )};
                    
                </div>
        </div>
    )
}

export default Body;