import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import '../../dist/styles/profile-order.css'
import $ from 'jquery'


class ProfileOrders extends Component {
    constructor(props) {
        super(props)
        this.componentDidMount = () => {
            $(document).ready(function(){
                $(window).trigger("load")
                $(window).on("load",function(){
                    var win = $(this)
                    if(win.width() <= 768){
                        // $('.product-image').removeClass('col-4')
                        // $('.product-image').addClass('col-6')
                    }
                })
            })
        }
    }
    render() {
        return (
            <div className="profile-order-root">
                <Card className="ProfileOrderCard">
                    <Card.Header>
                        <div className="row">
                            <div className="col">
                                Order Placed
                                </div>
                            <div className="col">
                                Total
                                </div>
                            <div className="col">
                                Ship To
                                </div>
                            <div className="col">
                                Order#
                                </div>
                            <div className="col">
                                Order Details
                                </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <b>Date</b>
                            </div>
                            <div className="col">
                                <b>Amount</b>
                            </div>
                            <div className="col">
                                <b>User</b>
                            </div>
                            <div className="col">
                                <b>1464541546545</b>
                            </div>

                            <div className="col">
                                Invoice
                                </div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>Order Status</Card.Title>
                        <div className="row">
                            <div className="product-image col-4">
                                <img src={require('../../../productImages/pro1.jpg')} alt="Product" width="120px"></img>
                            </div>
                            <div className="product-sub-detail col-8">
                                <div className="row OrderContent">
                                    Product Full Name
                                    </div>
                                <div className="row OrderContent">
                                    Price
                                    </div>
                                <div className="row OrderContent">
                                    <Button>Buy Again</Button>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default ProfileOrders