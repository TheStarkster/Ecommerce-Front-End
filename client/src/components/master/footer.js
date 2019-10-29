import React, { Component } from 'react'
import '../../dist/styles/css/footer.css'

export default class Footer extends Component {
    render() {
        return (
            <div className="Footer-Root">
                <div className="Footer-Brand-Name">
                    <div>
                        <div>Dental</div>
                        <div>Stall</div>
                    </div>
                </div>
                <div className="Footer-Content">
                    <div className="Footer-About">
                        <h4>ABOUT</h4>
                        <h6>Contact Us</h6>
                        <h6>About Us</h6>
                    </div>
                    <div className="Footer-Social">
                        <h4>SOCIAL</h4>
                        <h6>Instagram</h6>
                        <h6>Facebook</h6>
                        <h6>LinkedIn</h6>
                    </div>
                    <div className="Footer-Address">
                        <h4>OFFICE</h4>
                        <h6>was popularised in the 1960s with the release of Letraset sheets </h6>
                    </div>
                </div>
                <div className="Footer-Developer">
                    <h6>DEVELOPED BY</h6>
                    <a href="http://grevity.in" target="blank"><h4>Grevity.in</h4></a>
                </div>
            </div>
        )
    }
}
