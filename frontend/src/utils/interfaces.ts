export interface IAuthState {
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean | null;
    user: any;
}

export interface IAuthAction {
    type: string;
    payload: any;
}

export interface RootState {
    auth: IAuthState;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IResetPasswordConfirm {
    uid: string | undefined;
    token: string | undefined;
    new_password: string;
    re_new_password: string;
}

export interface ISignUp {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    re_password: string;
}

export interface IVerify {
    uid: string | undefined;
    token: string | undefined;
}

export interface IGoogleAuth {
    state: any;
    code: any;
}