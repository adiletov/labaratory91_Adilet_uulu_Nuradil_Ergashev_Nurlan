import React from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';

const Header = ({user, logout}) => {
    return (
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RouterNavLink} to="/chat">Chat</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        {user ?
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Здравствуйте {user.fullName}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={logout}>
                                            Выйти
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                         :
                            <>
                            <NavItem>
                                <NavLink tag={RouterNavLink} to="/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink tag={RouterNavLink} to="/login">Login</NavLink>
                            </NavItem>
                            </>
                        }

                    </Nav>
            </Navbar>
    );
};

export default Header;