/* JS Program
const heading = document.createElement("h1");
heading.innerHTML = "Hello World using JavaScript";
const root = document.getElementById("root");
root.appendChild(heading);*/


/*React Program
const heading = React.createElement("h1",{id:"heading"},"Hello world using React");
console.log(heading);//Object
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);*/



/*Nested HTML Structure using React
*<div id="parent">
*   <div id="child">
*       <h1>I'm h1 Tag</h1>
*       <h2>I'm h2 Tag</h2>
*   </div>
*   <div id="child">
*       <h1>I'm h1 Tag</h1>
*       <h2>I'm h2 Tag</h2>
*   </div>
*</div>
*
*/

const parent = React.createElement("div",{id:"parent"},
    [React.createElement("div",{id:"child"},
        [React.createElement("h1",{},"I'm h1 Tag"),
        React.createElement("h2",{},"I'm h2 Tag")
        ]),
    React.createElement("div",{id:"child"},
        [React.createElement("h1",{},"I'm h1 Tag"),
        React.createElement("h2",{},"I'm h2 Tag")
        ])
    ]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent)


//JSX

