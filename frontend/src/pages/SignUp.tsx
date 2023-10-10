import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";
import { ISignUp, RootState } from "../utils/interfaces";
import axios from "axios";

interface IProps {
	signup: (data: ISignUp) => Promise<void>;
	isAuthenticated: boolean | null;
}

const SignUp: React.FC<IProps> = ({ signup, isAuthenticated }) => {
	const [accountCreated, setAccountCreated] = useState<boolean>(false);
	const [formData, setFormData] = useState<ISignUp>({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: ''
	});

	const { first_name, last_name, email, password, re_password } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password === re_password) {
			signup({first_name, last_name, email, password, re_password});
			setAccountCreated(true);
		}
	}

	const continueWithGoogle = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=http://localhost:8000`)

			window.location.replace(response.data.authorization_url);
		} catch (error:any) {
			
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
						placeholder="First name*"
						name="first_name"
						value={first_name}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="text"
						placeholder="Last name*"
						name="last_name"
						value={last_name}
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
			<button className="btn btn-danger mt-3" onClick={continueWithGoogle}>
				Continue with Google
			</button>
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