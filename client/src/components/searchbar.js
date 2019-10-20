import React, { Component } from 'react'
import '../dist/styles/css/searchbar.css'

class SearchBar extends Component {
    render() {
        return (
            <div className="SearchBar-Root">
                {/* <img src={require('../dist/assets/icons/icons8-search-60.png')} alt="Search" className="Search-Icon"></img> */}
                <input type="text" className="Searchbar" placeholder="What Are You Looking For?"></input>
            </div>
        )
    }
}

export default SearchBar