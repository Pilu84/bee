import React from "react";
import axios from "axios";
import $ from "jquery";


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {search: "", result: false, data: "", visible: false, value: "", filter: false, valami: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
    }

    handleListClick(e) {

        this.setState({visible: false});

        $( "input[name='city']" ).val(e.target.textContent);


    }

    handleClick() {
        this.setState({visible: true});
    }

    handleChange(e) {
        const search = e.target.value;
        const list = this.state.data;

        var newList = list.filter(function(v) {
            return v.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        this.setState({data: newList});
    }




    handleSubmit(e) {
        e.preventDefault();
    }

    componentDidMount() {
        axios.get("/citiinuk").then(resp => {

            let list = [];
            for (var i = 0; i < resp.data.cities.length; i++) {
                list.push(resp.data.cities[i].city);
            }
            this.setState({data: list});

        });
    }


    render() {

        const { data } = this.state;
        if (!data) {
            return null;
        }


        let arrOfCities = data.map((citiname, index) => {

            return (
                <li key = {index} className="text-dark" onClick={this.handleListClick}>{citiname}</li>
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
                                <input type="search" className="form-control text-dark rounded shadow" placeholder="Enter city name" aria-label="name" aria-describedby="basic-addon1" name="city" onChange={this.handleChange} onClick={this.handleClick} />
                            </div>
                            {this.state.visible && <div id="results" className="bg-light">
                                <ul className="overflow-auto h-100">
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
