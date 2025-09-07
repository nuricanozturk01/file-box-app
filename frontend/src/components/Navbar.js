import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import account_image from '../images/account.svg'
import app_image from '../images/database-svgrepo-com.svg'
import home_image from '../images/home.svg'
import {Offcanvas} from "react-bootstrap";
import UploadListComponent from "./UploadListComponent";
const NavBar = () =>
{
    const [showUploadList, setShowUploadList] = useState(false)
    const HandleUploadList = () =>
    {
        setShowUploadList(true)
    };
    const handleCloseUploadList = () =>
    {
        setShowUploadList(false)
    };
    return (
        <Navbar style={{backgroundColor: "#202020"}}>
            <Container>
                <Navbar.Brand href="/" style={{color: "#c5c5c5"}}>
                    <img src={app_image} alt="account" width="35px" height="39px"/>

                    <label style={{marginLeft: "4px"}}>
                        FileBox
                    </label>

                </Navbar.Brand>
                <Navbar.Brand style={{color: "#c5c5c5"}} href="/home">
                    <img src={home_image} alt="account" width="35px" height="39px"
                    style={{marginRight: "2px", marginBottom: "6px"}}/>

                    <label style={{marginLeft: "4px", marginTop: "5px"}}>Home</label>
                </Navbar.Brand>


                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Navbar.Brand style={{color: "#c5c5c5", fontSize: "11pt", fontFamily: "Arial, Helvetica, sans-serif"}}>
                            <img src={account_image} alt="account" width="25px" height="27px"/>
                            <label id="account-info" style={{marginLeft: "4px"}}>
                                account: [{localStorage.getItem('username')}]
                            </label>
                        </Navbar.Brand>
                    </Nav>
                    <Nav className="ms-auto">
                        <Navbar.Brand style={{color: "#B2B2B2"}} onClick={HandleUploadList} href="#">
                            Upload List
                        </Navbar.Brand>


                        <Offcanvas style={{backgroundColor: "#1c1c1c"}} show={showUploadList} placement="end" onHide={handleCloseUploadList}>

                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title style={{color: "#b2b2b2", justifyContent: "center",textAlign: "center"}}>Upload List</Offcanvas.Title>
                            </Offcanvas.Header>

                            <Offcanvas.Body>
                               <UploadListComponent/>
                            </Offcanvas.Body>
                        </Offcanvas>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavBar;
