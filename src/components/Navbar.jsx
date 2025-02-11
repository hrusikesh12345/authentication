
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar" style={{ backgroundColor: '#172A3A' }}>
            <div class="container-fluid">
                <a class="navbar-brand text-light fw-bold fs-2">Authenticator</a>
                <form class="d-flex" >
                    <ul
                        style={{
                            listStyle: 'none',
                            display: 'flex',
                            gap: '20px',
                            margin: '0',
                        }}
                    >
                        <li>
                            <Link
                                to="/login"
                                className='btn btn-secondary px-4'
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className='btn btn-secondary px-3'
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </form>
            </div>

        </nav>
    );
};

export default Navbar;
