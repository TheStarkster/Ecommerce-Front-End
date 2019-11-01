import React, { Component } from 'react'
import { UserContext } from './master/context/user'

export default class ProfileOrders extends Component {
    static contextType = UserContext
    renderOrders() {
        const { UserData } = this.context
        this.OrdersArr = []
        this.ItemsArr = []
        UserData.orders.forEach(element => {
            element.forEach(element1 => {
                this.renderMainItems(element1)
            })
        })
        return this.ItemsArr1
    }
    renderMainItems(element1){
        this.ItemsArr1 = []
        element1.forEach(element2 => {
            this.ItemsArr.push(
                <div>
                    {element2.ProductName}
                </div>
            )
        })
        return this.ItemsArr1
    }
    render() {
        const { UserData } = this.context
        return (
            <div className="Profile-Sub-Parts-Root">
                {
                    UserData.orders === undefined ?
                        <div className="Error-Msg">
                            <h2>
                                You've Made No Orders Yet!
                            </h2>
                        </div>
                        :
                        <h2>
                            {this.renderOrders()}
                        </h2>
                }
            </div>
        )
    }
}
