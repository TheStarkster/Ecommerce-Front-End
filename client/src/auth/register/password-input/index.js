import React from 'react'
import { strengthIndicator, strengthColor } from './strength'
import '../../styles.css'

export default function PasswordInput(props) {
    const strength = strengthIndicator(props.value)
    const str = strengthColor(strength)
    return (
        <div className="form-field">
            <input
                type="password"
                value={props.value}
                className="password-input"
                placeholder={props.placeholder}
                onChange={props.handleChange}
                style={{
                    borderBottom: `2px solid ${str.color}`
                }}
            />
            <span className="password-strength-label"
                style={{
                    color: `${str.color}`
                }}
            >{str.label}</span>
        </div>
    )
}