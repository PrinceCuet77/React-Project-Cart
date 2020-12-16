import React, { useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'

// api
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

let initialState = {
	loading: false,
	cart: cartItems,
	total: 0,
	amount: 0
}

const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	let clearCart = () => {
		dispatch({ type: 'CLEAR_CART' })
	}

	let remove = (id) => {
		dispatch({ type: 'REMOVE', payload: id })
	}

	let increase = (id) => {
		dispatch({ type: 'INCREASE', payload: id })
	}

	let decrease = (id) => {
		dispatch({ type: 'DECREASE', payload: id })
	}

	let fetchData = async () => {
		dispatch({ type: 'LOADLING' })
		let response = await fetch(url)
		let cart = await response.json()
		dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		dispatch({ type: 'GET_TOTALS' })
	}, [state.cart])

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				remove,
				increase,
				decrease
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext)
}

export { AppContext, AppProvider }
