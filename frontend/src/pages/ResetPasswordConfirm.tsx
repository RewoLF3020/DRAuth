import React, { ChangeEvent, FormEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";
import { IResetPasswordConfirm } from "../utils/interfaces";

interface IProps {
	reset_password_confirm: (data: IResetPasswordConfirm) => Promise<void>;
}

interface IFormData {
	new_password: string;
	re_new_password: string;
}

const ResetPasswordConfirm: React.FC<IProps> = ({ reset_password_confirm }) => {
	const [requestSent, setRequestSent] = useState<boolean>(false);
	const [formData, setFormData] = useState<IFormData>({
		new_password: '',
		re_new_password: ''	
	});

	const { new_password, re_new_password } = formData;

	const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

	const { uid, token } = useParams();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		reset_password_confirm({uid, token, new_password, re_new_password});
		setRequestSent(true);
	}

	if (requestSent) {
		return <Navigate to='/' />
	}

    return (
        <div className="container mt-5">
			<form onSubmit={e => onSubmit(e)}>
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="password"
						placeholder="New password"
						name="new_password"
						value={new_password}
						onChange={e => onChange(e)}
						minLength={6}
						required
					/>
				</div>
				<div className="form-group mt-3">
					<input
						className="form-control"
						type="password"
						placeholder="Confirm new password"
						name="re_new_password"
						value={re_new_password}
						onChange={e => onChange(e)}
						minLength={6}
						required
					/>
				</div>
				<button className="btn btn-primary mt-3" type="submit">Reset password</button>
			</form>
        </div>
    );
}

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);