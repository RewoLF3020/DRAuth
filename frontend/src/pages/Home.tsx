import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const customStyles = {
		backgroundColor: '#e9ecef',
	};

    return (
		<div className="container rounded p-5 mt-5" style={customStyles}>
        	<div className="jumbotron mt-5">
        	    <h1 className="display-4">Welcome to DRAuth!</h1>
        	    <p className="lead">
					This is an incredible authentication system with production level features.
        	    </p>
        	    <hr className="my-4" />
        	    <p>Click the Log In button</p>
        	    <p className="lead">
        	        <Link to="/login" className="btn btn-primary btn-lg" role="button">
        	            Login
        	        </Link>
        	    </p>
        	</div>
		</div>
    );
};

export default Home;