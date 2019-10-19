import React from 'react'

function FourOFour(){
    return(
        <div style={{
            position:'fixed',
            width:'100%',
            height:'100%',
            top:'30%',
            left:'50%',
            transform:'translate(-50%,-30%)',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            color:'#b5b5b5',
        }}>
            <img src={require('./dist/assets/images/404-dental.jpg')} style={{
                maxWidth:'60%',
            }} alt="404"></img>
            <h2>oops! There's No one Here!</h2>
        </div>
    )
}
export default FourOFour