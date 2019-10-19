const hasNumbers = value => {
	return new RegExp(/[0-9]/).test(value)
}
const hasSpecial = value => {
	return (/[!@#$^&*)(+=._-]/.test(value))
}
const hasMixed = value => {
	return  new RegExp(/[a-z]/).test(value) && 
			new RegExp(/[A-Z]/).test(value)
}
export const strengthColor = count => {
	if(count < 1) return '#ffffff'
	if(count < 3) return {label: 'Very Weak', color: 'red'}
	if(count < 4) return {label: 'Weak', color: 'yellow'}
	if(count < 5) return {label: 'Strong', color: 'orange'}
	if(count < 6) return {label: 'Very Strong', color: '#1ed88f'}
}
export const strengthIndicator = value => {
	const matched = []
	if (value.length > 5) matched.push('greater-than-5')
	if (value.length > 7) matched.push('greater-than-7')
	if(hasNumbers(value)) matched.push('has-numbers')
	if(hasMixed(value)) matched.push('has-mixed')
	if(hasSpecial(value)) matched.push('has-special')
	return matched.length
}