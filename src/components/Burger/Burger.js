import React from 'react';
import classes from './Burger.css';
import BurgerIng from './BurgerIng/BurgerIng';
// import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const burger = (props) =>{
    //console.log(props);
    let transformedIng = Object.keys(props.ingredients)
    .map(igKey =>{
        return [...Array(props.ingredients[igKey])]
        .map((_,i)=>{
            //console.log(Array(props.ingredients[igKey]));
            //console.log(<BurgerIng key={igKey + i} type={igKey}/>)
            return <BurgerIng key={igKey + i} type={igKey} />;
        });
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    //console.log(transformedIng);
    if(transformedIng.length === 0){
        transformedIng = <p> Please start adding ingredients</p>
    }

// const burger = (props) =>{
//     const transformedIng = Object.keys(props.ingredients)
//     .map(igKey =>{
//         return  <BurgerIng key={igKey} type={igKey} />;
//     });

        
    return(
        <div className={classes.Burger}>
            <BurgerIng type="bread-top" />
            {transformedIng}
            <BurgerIng type="bread-bottom"/>
         </div>
    )

}

export default burger;