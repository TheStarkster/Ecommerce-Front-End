import React, { Component } from 'react'
import '../dist/styles/css/searchbar.css'
import Axios from 'axios'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.getItems = this.getItems.bind(this)
        this.state = {
            fetching: false
        }
    }
    getItems = (event) => {
        this.setState({
            fetching: true
        })
        if (event.target.value === "") {
            Axios.get('http://3.19.58.80:2024/User-fetch-products')
                .then(response => {
                    this.props.trigger(response.data.products)
                    setTimeout(() => {
                        this.setState({
                            fetching: false
                        })
                    }, 1200)
                })
        }
        Axios.get('http://3.19.58.80:2024/find-product/' + event.target.value)
            .then(response => {
                this.props.trigger(response.data)
                setTimeout(() => {
                    this.setState({
                        fetching: false
                    })
                }, 1200)
            })
    }
    render() {
        return (
            <div className="SearchBar-Root">
                <input type="text" className="Searchbar" placeholder="What Are You Looking For?" onChange={this.getItems}></input>
                {
                    this.state.fetching ?
                        <label>Fetching Results...</label>
                        :
                        null
                }
            </div>
        )
    }
}

export default SearchBar