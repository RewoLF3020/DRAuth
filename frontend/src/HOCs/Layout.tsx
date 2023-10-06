import React from 'react'
import Navbar from '../components/Navbar'

export const Layout = (props: any) => {
	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
}
