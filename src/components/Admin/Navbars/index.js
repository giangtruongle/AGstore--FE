import React from 'react';
import './styled.scss';
import AuthUser from '../../../layouts/Default/AuthUser';

const Navbars = (props) => {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-12">
                        <ul className="nav justify-content-end">
                            <li className="nav-item">
                                <nav className="navbar navbar-light ">
                                    <div className="container-fluid">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                            <button className="btn btn-outline-success btn-create-user" type="button"
                                                onClick={() => { props.onCreate(); }}
                                            >Create New User</button>
                                        </form>
                                    </div>
                                </nav>
                            </li>
                            <li className="nav-item">
                                <AuthUser className="icon-user" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbars;
