import React, { ChangeEvent, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../actions/auth";

interface IProps {
	resetPassword: (email: string) => Promise<void>;
}

interface IResetPassword {
	email: string;
}

const ResetPassword: React.FC<IProps> = ({ resetPassword }) => {
	const [requestSent, setRequestSent] = useState<boolean>(false);
	const [formData, setFormData] = useState<IResetPassword>({
		email: '',
	});

	const { email } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		resetPassword(email);
		setRequestSent(true);
	}

	if (requestSent) {
		return <Navigate to='/' />
	}

    return (
        <div className="container mt-5">
			<h1>Request password reset</h1>
			<form onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						className="form-control"
						type="email"
						placeholder="Email"
						name="email"
						value={email}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<button className="btn btn-primary mt-3" type="submit">Reset password</button>
			</form>
        </div>
    );
}

export default connect(null, { resetPassword })(ResetPassword);