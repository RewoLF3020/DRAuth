import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { RootState, ILogin } from "../utils/interfaces";

interface IProps {
	login: (data: ILogin) => Promise<void>;
	isAuthenticated: boolean | null;
}

const Login: React.FC<IProps> = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState<ILogin>({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		login({email, password});
	}

	if (isAuthenticated) {
		return <Navigate to='/' />
	}

    return (
        <div className="container mt-5">
			<h1>Sign in</h1>
			<p>Sign into your account</p>
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
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={e => onChange(e)}
						minLength={6}
						required
					/>
				</div>
				<button className="btn btn-primary mt-3" type="submit">Login</button>
			</form>
			<p className="mt-3">
				Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign up</Link>
			</p>
			<p className="mt-3">
				Forgot your password? <Link to='/reset-password' style={{ textDecoration: 'none' }}>Reset password</Link>
			</p>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);