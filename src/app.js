import React from "react";
import axios from "axios";
import $ from "jquery";
import TimeAgo from 'react-timeago';


export default class App extends React.Component {
    constructor() {
        super();
        this.state = {search: "", data: "", visible: false, value: "", filter: false, results: [], fulllist: ""};
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleListClick = this.handleListClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }


    handleClose(e) {

        if (this.state.results.length == 0) {
            this.setState({results: []});
        } else {

            let newArray = [];
            for (var i = 0; i < this.state.results.length; i++) {
                if( i != e.currentTarget.id ) {
                    newArray.push(this.state.results[i]);
                }
            }
            
            this.setState({results: newArray});
        }
    }

    handleListClick(e) {

        this.setState({visible: false});
        $( "input[name='city']" ).val(e.target.textContent);
        let cityname = e.target.textContent;


        axios.post("/sendciti", {cityname: cityname}).then(resp => {
            let resultList = this.state.results;
            resultList.push(resp.data.airdata);
            this.setState({results: resultList, data: this.state.fulllist});
            $( "input[name='city']" ).val("");
        });
        console.log(this.state.results);


    }

    handleFocus() {
        this.setState({visible: true});
    }

    handleChange(e) {
        const search = e.target.value;
        const list = this.state.fulllist;

        var newList = list.filter(function(v) {
            return v.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        this.setState({data: newList});
    }




    // handleSubmit(e) {
    //     e.preventDefault();
    //     sendData();
    // }

    componentDidMount() {
        axios.get("/citiinuk").then(resp => {
            this.setState({data: resp.data.cities, fulllist: resp.data.cities});
        });


    }


    render() {


        const { data, results } = this.state;
        if (!data) {
            return null;
        }


        let arrOfCities = data.map((citiname, index) => {

            return (
                <li key = {index} className="text-dark" onClick={this.handleListClick}>{citiname}</li>
            );
        });



        let resultsCities = results.map((result, index) => {
            return (
                <div key = {index} className="text-dark rounded bg-light m-5 p-5">
                    <span id={index} onClick={this.handleClose}><i className="fas fa-times text-secondary"></i></span>
                    <p className="text-dark"></p>
                    <p className="text-dark">Updated <TimeAgo date={result.updated} className="text-dark"/></p>
                    <h3 className="text-dark">{result.location}</h3>
                    <p className="text-dark">in {result.city}, United Kingdom</p>
                    {

                        result.measurements.map((name, subindex) => {
                            return (
                                <div key = {subindex} className="text-dark">
                                    <p className="text-dark">{name.parameter}: {name.value}</p>

                                </div>
                            );
                        })


                    }
                </div>
            );
        });


        return(
            <div className="row justify-content-center align-items-center pt-5 h-100">
                <div className="container-fluid p-5">
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
                                <input type="search" className="form-control text-dark rounded shadow" placeholder="Enter city name" aria-label="name" aria-describedby="basic-addon1" name="city" onChange={this.handleChange} onFocus={this.handleFocus} />
                            </div>
                            {this.state.visible && <div id="results" className="bg-light" >
                                <ul className="overflow-auto rounded">
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


                {this.state.results.length > 0 && <div className="row" >

                    {resultsCities}



                </div>}


            </div>
        );
    }
}
