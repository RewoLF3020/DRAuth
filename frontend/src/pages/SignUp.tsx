import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { ISignUp, RootState } from "../utils/interfaces";

interface IProps {
	signup: (data: ISignUp) => Promise<void>;
	isAuthenticated: boolean | null;
}

const SignUp: React.FC<IProps> = ({ signup, isAuthenticated }) => {
	const [accountCreated, setAccountCreated] = useState<boolean>(false);
	const [formData, setFormData] = useState<ISignUp>({
		name: '',
		email: '',
		password: '',
		re_password: ''
	});

	const { name, email, password, re_password } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password === re_password) {
			signup({name, email, password, re_password});
			setAccountCreated(true);
		}
	}

	if (isAuthenticated) {
		return <Navigate to='/' />
	}

	if (accountCreated) {
		return <Navigate to='/login' />
	}

    return (
        <div className="container mt-5">
			<h1>Sign up</h1>
			<p>Create your account</p>
			<form onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						className="form-control"
						type="text"
						placeholder="Name*"
						name="name"
						value={name}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="email"
						placeholder="Email*"
						name="email"
						value={email}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="password"
						placeholder="Password*"
						name="password"
						value={password}
						onChange={e => onChange(e)}
						minLength={6}
						required
					/>
				</div>
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="password"
						placeholder="Confirm password*"
						name="re_password"
						value={re_password}
						onChange={e => onChange(e)}
						minLength={6}
						required
					/>
				</div>
				<button className="btn btn-primary mt-3" type="submit">Register</button>
			</form>
			<p className="mt-3">
				Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Sign in</Link>
			</p>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(SignUp);