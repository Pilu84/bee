import React from "react";
import axios from "axios";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {search: "", result: false, data: "", visible: false, value: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    handleListClick(e) {
        console.log("az e target: ", e.target.textContent);
        this.setState({value: e.target.textContent, visible: false});
    }

    handleClick() {
        this.setState({visible: true});
    }

    handleChange(e) {
        const search = e.target.value;
        this.setState({search: search, result: true});

    }


    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
        axios.get("/citiinuk").then(resp => {
            this.setState({data: resp.data});
        });
    }


    render() {

        const { data } = this.state;
        if (!data) {
            return null;
        }

        let arrOfCities = data.cities.map((citiname, index) => {

            return (
                <li key = {index} className="text-dark" onClick={this.handleListClick}>{citiname.city}</li>
            );
        });


        return(
            <div className="row justify-content-center align-items-center pt-5">
                <div className="container-fluid">
                    <h1 className="text-center">Compare your Air</h1>
                    <div className="container-fluid text-center mt-5">
                        <p>Compare the air quality between cities in the UK</p>
                        <p>Select cities to compare using the search tool below.</p>
                    </div>
                </div>
                <div className="row p-5">
                    <form onSubmit={this.handleSubmit} className="form-horizontal w-100">

                        <div className="form-group">
                            <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-search text-secondary"></i></span>
                                </div>
                                <input type="search" className="form-control text-dark rounded shadow" placeholder="Enter city name" aria-label="name" aria-describedby="basic-addon1" name="city" onChange={this.handleChange} onClick={this.handleClick} value={this.state.value}/>
                            </div>
                            {this.state.visible && <div id="results" className="bg-light">
                                <ul className="overflow-auto">
                                    {arrOfCities}
                                </ul>

                            </div>}
                        </div>

                        <div className="form-group">
                            <div className="input-group mb-3 justify-content-center">
                                <button className = "btn btn-primary mt-5 mb-5">Search city</button>
                            </div>
                        </div>

                    </form>
                </div>



            </div>
        );
    }
}
