import React, { Component } from 'react'
import '../../dist/styles/css/navbar.css'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarExpanded: false,
            Loading: 'none',
        }
        var scroll = 0
        this.componentDidMount = () => {
            window.addEventListener("scroll", function (event) {
                scroll = this.scrollY;
                if (scroll > 40) {
                    this.document.getElementById('Navbar-Root').style.backgroundColor = '#18c0c9'
                    this.document.getElementById('nav-item-dentalstall').style.fontSize = '26px'
                    this.document.getElementById('nav-dental').style.color = 'white'
                    this.document.getElementById('nav-stall').style.color = 'white'
                }
                if (scroll < 40) {
                    if (document.getElementById('li-desktop-1').style.display !== 'block') {
                        this.document.getElementById('Navbar-Root').style.backgroundColor = 'transparent'
                        this.document.getElementById('nav-dental').style.color = '#4b6679'
                        this.document.getElementById('nav-stall').style.color = '#40d965'
                    }
                    this.document.getElementById('nav-item-dentalstall').style.fontSize = '38px'
                }
            })
            this.ExpandNavbar = () => {
                if (this.state.navbarExpanded) {
                    if (scroll > 40) {
                        document.getElementById('Navbar-Root').style.backgroundColor = '#18c0c9'
                        document.getElementById('Navbar-Root').style.height = '67px'
                        document.getElementById('li-desktop-1').style.display = 'none'
                        document.getElementById('li-desktop-2').style.display = 'none'
                        document.getElementById('nav-dental').style.color = 'white'
                        document.getElementById('nav-stall').style.color = 'white'
                    }
                    if (scroll < 40) {
                        document.getElementById('Navbar-Root').style.backgroundColor = 'transparent'
                        document.getElementById('Navbar-Root').style.height = '67px'
                        document.getElementById('li-desktop-1').style.display = 'none'
                        document.getElementById('li-desktop-2').style.display = 'none'
                        document.getElementById('nav-dental').style.color = '#4b6679'
                        document.getElementById('nav-stall').style.color = '#40d965'
                    }
                    this.setState({
                        navbarExpanded: false
                    })
                } else {
                    document.getElementById('Navbar-Root').style.backgroundColor = '#18c0c9'
                    document.getElementById('Navbar-Root').style.height = '162px'
                    document.getElementById('li-desktop-1').style.display = 'block'
                    document.getElementById('li-desktop-2').style.display = 'block'
                    document.getElementById('nav-dental').style.color = 'white'
                    document.getElementById('nav-stall').style.color = 'white'
                    this.setState({
                        navbarExpanded: true
                    })
                }
            }
        }
    }
    render() {
        return (
            <div className="Navbar-Root" id="Navbar-Root">
                <img src={require('../../dist/assets/animation/Preloader.gif')} alt="Loading" style={{
                    position: "fixed",
                    display: this.state.Loading,
                    top: "50%",
                    left: "50%",
                    width: '50px',
                    transform: "translate(-50%,-50%)",
                    borderRadius: '100px'
                }}></img>
                <div className="nav-items-root">
                    <ul>
                        <li>
                            <div className="nav-item-dentalstall" id="nav-item-dentalstall">
                                <div className="nav-dental" id="nav-dental">
                                    Dental
                                </div>
                                <div className="nav-stall" id="nav-stall">
                                    Stall
                                </div>
                            </div>
                        </li>
                        <li className="li-desktop" id="li-desktop-1" onClick={() => {
                            if (this.props.history.location.pathname !== '/profile') {
                                this.setState({
                                    Loading: 'block'
                                }, () => {
                                    setTimeout(() => {
                                        this.props.history.push('/profile')
                                    }, 2000)
                                })
                            }
                        }}>
                            Account
                        </li>
                        <li className="li-desktop" id="li-desktop-2">
                            Deals
                        </li>
                    </ul>
                    <img src={require('../../dist/assets/icons/icons8-menu-50.png')} alt="Menu" className="nav-menu-icon" onClick={() => this.ExpandNavbar()}></img>
                </div>
            </div>
        )
    }
}