let reducer = (state, action) => {
	if (action.type === 'CLEAR_CART') {
		return { ...state, cart: [] }
	}

	if (action.type === 'REMOVE') {
		return {
			...state,
			cart: state.cart.filter(
				(cartItem) => cartItem.id !== action.payload
			)
		}
	}

	if (action.type === 'INCREASE') {
		let tempCart = state.cart.map((cartItem) => {
			if (cartItem.id === action.payload) {
				return { ...cartItem, amount: cartItem.amount + 1 }
			}
			return cartItem
		})
		return { ...state, cart: tempCart }
	}

	if (action.type === 'DECREASE') {
		let tempCart = state.cart
			.map((cartItem) => {
				if (cartItem.id === action.payload) {
					return { ...cartItem, amount: cartItem.amount - 1 }
				}
				return cartItem
			})
			.filter((cartItem) => cartItem.amount !== 0) // if amount !== 0 then return cart array and otherwise return empty array
		return { ...state, cart: tempCart }
	}

	if (action.type === 'GET_TOTALS') {
		let { total, amount } = state.cart.reduce(
			(cartTotal, cartItem) => {
				let { price, amount } = cartItem
				let itemTotal = price * amount

				cartTotal.total += itemTotal
				cartTotal.amount += amount

				return cartTotal
			},
			{
				total: 0,
				amount: 0
			}
		)
		total = parseFloat(total.toFixed(2))
		return { ...state, total, amount }
	}

	if (action.type === 'LOADING') {
		return { ...state, loading: true }
	}

	if (action.type === 'DISPLAY_ITEMS') {
		return { ...state, cart: action.payload }
	}

	return state
	// throw new Error('no matching action type')
}

export default reducer
