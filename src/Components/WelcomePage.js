import React from 'react';
import "../Styles/WelcomePage.css";
import LoginButton from './LoginButton';

class WelcomePage extends React.Component{



    render(){


        return(
            <div className="welcome">
            <h1>Welcome to The Digimons!</h1>
            <p>Thank you for visiting. We hope you Enjoy here.</p>
            <div className='headerbtn'>
            <LoginButton  />
            </div>
          </div>
           

            
        )
    }



}


export default WelcomePage