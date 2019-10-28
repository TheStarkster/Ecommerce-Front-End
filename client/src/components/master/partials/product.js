import React, { Component } from 'react'
import '../../../dist/styles/css/partials.css'

export default class Product extends Component {
    render() {
        return (
            <div className="Partial-Product-Root">
                <h3>{this.props.message}</h3>
            </div>
        )
    }   
}
