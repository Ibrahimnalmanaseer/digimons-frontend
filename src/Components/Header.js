import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from './LogoutButton';
import '../Styles/Header.css';
import { withAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        const { isAuthenticated } = this.props.auth0;
      return (
        <Navbar id="navigation" sticky="top" collapseOnSelect expand="lg">
        <Container>
        <Link to="/">
          <Navbar.Brand id="logo" >Digimons</Navbar.Brand>
          </Link>
       
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto justify-content-end" id="items" style={{ width: "100%" }}>

            {isAuthenticated?<Nav.Link ><Link id="navitems" style={{ textDecoration: 'none', }} to="/mydigimons">My Digimons</Link></Nav.Link>:<></>}
            
           
            <div className='headerbtn'>
            <LogoutButton />
            </div>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        )
    }
  }
  
  export default withAuth0(Header);