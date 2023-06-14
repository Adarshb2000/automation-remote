import { useLocation } from "react-router-dom"

const ConstructRoom = (scale, data) => {

    const location = useLocation();
    const myDetails = location.state;
    console.log(myDetails)

}