import React, {Component} from 'react';
import classes from './Modal.css';
// import Aux from '../../../hoc/Auxiliary';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    // shouldComponentUpdate(nextProps, nextState){
    //     if(nextProps.show !== this.props.show){
    //         return true;
    //     }
    // }
    shouldComponentUpdate(nextProps, nextState){
       // console.log(nextProps.show !== this.props.show || nextProps.children !== this.props.children);
    //    console.log(this.props.children);
    //    console.log(nextProps.children);
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    UNSAFE_componentWillUpdate(){
        console.log('Modal willUpdate');
    }
    render (){
        console.log('modal is workk');
        return(
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', 
                    opacity: this.props.show ? '1' : '0'
                }}>
                {this.props.children}
            </div>
        </Aux>
    

        );
    }
} 

export default Modal;