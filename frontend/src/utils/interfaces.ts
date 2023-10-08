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