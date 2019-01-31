import React from "react";


export default class App extends React.Component {
    constructor() {
        super();
    }


    render() {



        return(
            <div className="fluid row justify-content-center align-items-center full-size">
                <h1>Compare your Air</h1>
                <div className="container-fluid text-center">
                    <p>Compare the air quality between cities in the UK</p>
                    <p>Select cities to compare using the search tool below.</p>
                </div>


            </div>
        );
    }
}
