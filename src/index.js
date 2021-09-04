import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = {
        lat: null,
        errorMessage: "",
    }

    //Finds current geolocation: latitude
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    //created renderContent 'helper method' to render the red border(line 35) to be shown regardless of the condition. This is instead of creating a className on each condition separately. Just an example, does not show red border
    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage} </div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }

        return <Spinner message="Please accept location request" />;
    }
    
    render() {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    };
}

ReactDOM.render(
    <App />, document.querySelector('#root')
);