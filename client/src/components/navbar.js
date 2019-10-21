import React, { Component } from 'react'
import '../dist/styles/css/navbar.css'

export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.componentDidMount = () => {
            window.addEventListener("scroll", function (event) {
                var scroll = this.scrollY;
                if (scroll > 40) {
                    this.document.getElementById('Navbar-Root').style.backgroundColor = '#18c0c9'
                    this.document.getElementById('nav-item-dentalstall').style.fontSize = '26px'
                    this.document.getElementById('nav-dental').style.color = 'white'
                    this.document.getElementById('nav-stall').style.color = 'white'
                }
                if (scroll < 40) {
                    this.document.getElementById('Navbar-Root').style.backgroundColor = 'transparent'
                    this.document.getElementById('nav-item-dentalstall').style.fontSize = '38px'
                    this.document.getElementById('nav-dental').style.color = '#4b6679'
                    this.document.getElementById('nav-stall').style.color = '#40d965'
                }
            })
        }
    }
    render() {
        return (
            <div className="Navbar-Root" id="Navbar-Root">
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
                        <li className="li-desktop">
                            Account
                        </li>
                        <li className="li-desktop">
                            Deals
                        </li>
                    </ul>
                    <img src={require('../dist/assets/icons/icons8-menu-50.png')} alt="Menu" className="nav-menu-icon"></img>
                </div>
            </div>
        )
    }
}
