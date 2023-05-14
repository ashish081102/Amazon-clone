export let initialState = {
    basket: [],
    user:null
}

// state is the state of the application 
// and action is what we are trying to do add to the basket or remove from the basket 


// Selector 
// reduce goes through the basket and then telly up the total and return it reduce(initial_amnt,iterate_through_each_item)
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)


const reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
                // Whatever was the initial state +whatever is the item that we have include in the basket by the above code 
            };
        case "REMOVE_ITEM":
            const itemId = state.basket.findIndex((basketItem) => basketItem.id === action.id)
            const newBasket = [...state.basket]
            if (itemId >= 0) {
                newBasket.splice(itemId, 1);
            } else {
                console.warn(`Cant remove product(id: ${action.id}) as its not in basket!!`)
            }
            return {
                ...state,
                basket: newBasket

            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        default:
            return state;
    }
};
export default reducer;

// pulling the data into the data layer is the part where reducer plays imp part 