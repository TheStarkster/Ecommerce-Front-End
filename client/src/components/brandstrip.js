import React, { Component } from 'react'
import '../dist/styles/css/brandstrip.css'

export default class BrandStrip extends Component {
    render() {
        return (
            <div className="Brand-Container">
                <h2 style={{
                    position:'absolute',
                    left:'50%',
                    transform:'translate(-50%,0%)',
                    fontFamily: 'Quicksand-Regular',
                    color:'white'
                }}>Top Brands</h2>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
                <div className="brand">
                    <img src="https://media.dentalkart.com/brands/3M ESPE.jpg" alt="Brand"></img>
                </div>
            </div>
        )
    }
}
