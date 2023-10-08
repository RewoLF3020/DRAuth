import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { RootState } from "../utils/interfaces";

interface INavbar {
    logout: () => void;
    isAuthenticated: boolean | null;
}

const Navbar: React.FC<INavbar> = ({ logout, isAuthenticated }) => {
    const guestLinks = () => {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                        Sign up
                    </Link>
                </li>
            </Fragment>
        );
    };

    const authLinks = () => {
        return (
            <li className="nav-item">
                <a className="nav-link" href="#!" onClick={logout}>Logout</a>
            </li>
        );
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                DRAuth
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    {isAuthenticated ? authLinks() : guestLinks()}
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = (state: RootState) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);
