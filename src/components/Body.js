import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";




const Body = () => {
    const [listOfRestaurants,setListOfRestaurants]=useState([]);

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async() => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();
       // console.log(json);

        //Optional Rendering
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    //Conditional Rendering
    // if(listOfRestaurants.length === 0){
    //     return <Shimmer />;
    // }


    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
                <div className="filter">
                    <button className="filter-btn"
                        onClick={() => {
                            const filterdList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4
                            );
                            setListOfRestaurants(filterdList)
                        }}>
                        Top Rated Restaurants
                    </button>
                    
                </div>
                <div className="res-container">
                    {listOfRestaurants.map(restaurant => (
                        <RestaurantCard key={restaurant.info.id} resData={restaurant}/>
                    )

                    )};
                    
                </div>
        </div>
    )
}

export default Body;