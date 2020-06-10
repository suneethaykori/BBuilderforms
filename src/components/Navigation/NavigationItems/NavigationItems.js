import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        {/* <li><a href="/">A Link</a></li> */}
        <NavigationItem link="/"  exact> Burger Builder </NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>

);

export default navigationItems;