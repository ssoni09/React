import { Component } from "react";
import UserClass from "./UserClass";

class About extends Component {
    constructor(props) {
        super(props);

      //console.log("Parent Constructor");
    }

    componentDidMount() {
      //console.log("Parent Component Did Mount");
    }

    render() {
      //console.log("Parent Render");

        return (
        
        <div>
            <h1>About</h1>
            <h2>This is Swiggy Application using react</h2>
            <UserClass />
        </div>
    
)
    }
}




export default About;
