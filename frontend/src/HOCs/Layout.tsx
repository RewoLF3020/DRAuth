import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { checkAuthenticated, loadUser, googleAuth } from "../actions/auth";

const Layout = (props: any) => {
	let location = useLocation();

	useEffect(() => {
		const values = queryString.parse(location.search);
		const state = values.state ? values.state : null;
		const code = values.code ? values.code : null;

		// console.log('State: ' + state);
		// console.log('Code: ' + code);

		if (state && code) {
			googleAuth({state, code});
		} else {
			checkAuthenticated();
			loadUser();	
		}
	}, [location]);

	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
}

export default connect(null, { checkAuthenticated, loadUser, googleAuth })(Layout);