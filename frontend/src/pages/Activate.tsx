import React, { MouseEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { verify } from "../actions/auth";
import { IVerify } from "../utils/interfaces";

interface IProps {
	verify: (data: IVerify) => Promise<void>;
}

const Activate: React.FC<IProps> = ({ verify }) => {
	const cntrst = {
		marginTop: '200px'
	};

	const btnst = {
		marginTop: '50px'
	}

	const [verified, setVerified] = useState<boolean>();

	const { uid, token } = useParams();

	const verifyAccount = (e: MouseEvent<HTMLButtonElement>) => {
		verify({uid, token});
		setVerified(true);
	}

	if (verified) {
		return <Navigate to='/' />
	}

    return (
        <div className="container">
			<div 
				className="d-flex flex-column justify-content-center align-items-center"
				style={cntrst}
			>
				<h1>Verify your account</h1>
				<button
					onClick={verifyAccount}
					style={btnst}
					type="button"
					className="btn btn-primary"
				>
					Verify
				</button>
			</div>
        </div>
    );
}

export default connect(null, { verify })(Activate);