import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
// import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    pattie:0.7,
    meat: 1.3
}
class BurgerBuilder extends Component{
    state ={
        ingredients: null,
        //{
        //     salad:0,
        //     pattie:0,
        //     cheese:0,
        //     meat:0
        // },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-my-burger-d4ec1.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                })
                .catch(error => {
                    this.setState({error: true});

                });
    }

    // updatePurchaseState (){
    //     const ingredients = {
    //         ...this.state.ingredients
    //     };
    //     const sum = Object.keys(ingredients)
    //         .map(igKeys => {
    //             return ingredients[igKeys];
    //         })
    //         .reduce((sum, el)=>{
    //             return sum + el;
    //         },0);
    //         this.setState({purchasable: sum > 0});
    // }

    updatePurchaseState (ingredients){
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKeys => {
                return ingredients[igKeys];
            })
            .reduce((sum, el)=>{
                return sum + el;
            },0);
            this.setState({purchasable: sum > 0});
    }


    addIngredientsHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientsHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = ()=> {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // //alert('continue');
        // this.setState( {loading: true} );
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Jhon cool',
        //         address: {
        //             street: '123 Teststreet',
        //             zipCode: '12345',
        //             country: 'Canada',
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState( {loading: false, purchasing: false} )
        //     } )
        //         //console.log(response))
        //     .catch( error => {
        //         this.setState( {loading: false, purchasing: false} )
        //     });
        // this.props.history.push('/checkout');
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            console.log('query:' + queryParams);
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: 'checkout',
            search: '?' + queryString
        });

    }


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        // console.log(disabledInfo);
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />

        if(this.state.ingredients){
            burger = (
                <Auxiliary>
            <Burger ingredients = {this.state.ingredients} />
            <BuildControls 
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemoved ={this.removeIngredientsHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
            />
            </Auxiliary>
            );
            orderSummary = <OrderSummary 
            ingredients ={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }


        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {/* <OrderSummary 
                    ingredients ={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}/> */}
                    {orderSummary}
                </Modal>
                {burger}
                {/* <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                ingredientsAdded={this.addIngredientsHandler}
                ingredientsRemoved ={this.removeIngredientsHandler}
                disabled={disabledInfo}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}
                price={this.state.totalPrice}
                /> */}
            </Auxiliary>
        );
    }

}

export default withErrorHandler(BurgerBuilder, axios);