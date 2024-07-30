import { useEffect, useState } from "react";
import { MENU_URL } from "./constant";

const useRestaurantMenu = (resId) => {
    const [restInfo, setRestInfo] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(MENU_URL + resId);
        const json = await data.json();
        setRestInfo(json.data);
    };

    return restInfo;
};

export default useRestaurantMenu;