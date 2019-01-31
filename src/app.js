import React from "react";
import axios from "axios";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {valami: ""};
    }


    componentDidMount() {
        axios.get("/valami").then(resp=> {
            console.log("a resp: ", resp.data);
            this.setState({valami: resp.data.valami});
        });
    }

    render() {

        const { valami } = this.state;

        if(!valami) {
            return null;
        }

        return(
            <div>
                <h1>hello</h1>

                <h1>{this.state.valami}</h1>
            </div>
        );
    }
}
