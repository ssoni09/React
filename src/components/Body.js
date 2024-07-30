import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

const Body = () => {
    const [listOfRestaurants,setListOfRestaurants]=useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    // Whenever state variable update, react trigger a reconciliation cycle (re-render the component )
    console.log("Body Rendered");

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();
       // console.log(json);

        //Optional Rendering
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false)
        return (
        <h1>
            Looks like you're offline!! Please check your internet connection;
        </h1>
    );


    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
                <div className="filter">

                    <input
                        type="text"
                        className="search-box"
                        value={searchText}
                        onChange={(e) =>{
                            setSearchText(e.target.value)
                        }}></input>

                    <button onClick={() => {
                        //Filter the restaurant card and update the UI
                        //searchText
                        //console.log({searchText})

                        const filteredRestaurant = listOfRestaurants.filter(
                            (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurant);
                    }}>Search</button>

                    <button className="filter-btn"
                        onClick={() => {
                            const filterdList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4
                            );
                            setFilteredRestaurant(filterdList)
                        }}>
                        Top Rated Restaurants
                    </button>
                    
                </div>
                <div className="res-container">
                    {filteredRestaurant.map(restaurant => (
                        <Link  style={{ textDecoration: 'none' , color: 'black'}} to={"/restaurant/"+restaurant.info.id} key={restaurant.info.id}><RestaurantCard resData={restaurant}/></Link>
                        
                    )

                    )};
                    
                </div>
        </div>
    )
}

export default Body;