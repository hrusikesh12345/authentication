import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#172A3A' }}>
            <div className="container-fluid">
                <a className="navbar-brand text-light fw-bold fs-2">Authenticator</a>

                <button 
                    className="navbar-toggler border-light"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto d-flex gap-3">
                        <li className="nav-item">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `nav-link px-4 text-white ${isActive ? 'bg-success' : 'bg-secondary'} btn`
                                }
                                style={{ borderRadius: '10px' }}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `nav-link px-3 text-white ${isActive ? 'bg-success' : 'bg-secondary'} btn`
                                }
                                style={{ borderRadius: '10px' }}
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
