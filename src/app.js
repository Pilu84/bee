import React from "react";


export default class App extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
    }


    render() {



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
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><i className="fas fa-search text-secondary"></i></span>
                                </div>
                                <input type="text" className="form-control text-dark rounded shadow" placeholder="Enter city name" aria-label="name" aria-describedby="basic-addon1" name="city" onChange={this.handleChange} />
                            </div>
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
