import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { checkAuthenticated, loadUser } from "../actions/auth";

const Layout = (props: any) => {
	useEffect(() => {
		props.checkAuthenticated();
		props.loadUser();
	}, [])

	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
}

export default connect(null, { checkAuthenticated, loadUser })(Layout);