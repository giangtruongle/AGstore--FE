import React from 'react';
import './styled.scss';
import AuthUser from '../../../layouts/Default/AuthUser';

const NavbarProductCategory = (props) => {
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
                                            <button className="btn btn-outline-success btn-create-product-category" type="button"
                                                onClick={() => { props.onCreateNew(); }}
                                            >Create New Category</button>
                                        </form>
                                    </div>
                                </nav>
                            </li>
                            <li className="nav-item">
                                <AuthUser />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavbarProductCategory;
