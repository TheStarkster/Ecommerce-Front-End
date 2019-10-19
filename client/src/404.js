import React from 'react'

function FourOFour(){
    return(
        <div style={{
            position:'fixed',
            top:'30%',
            left:'50%',
            transform:'translate(-50%,-30%)',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            color:'#b5b5b5'
        }}>
            <img src={require('./dist/assets/images/404-dental.jpg')} alt="404"></img>
            <h2>oops! There's No one Here!</h2>
        </div>
    )
}
export default FourOFour