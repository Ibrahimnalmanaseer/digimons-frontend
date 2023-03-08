
import React from 'react';
import Digimons from './Components/Digimons'
import FavDigimons from './Components/FavDigimons';
import Header from './Components/Header';
import WelcomePage from './Components/WelcomePage';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component{
  
  render(){
  
    const { isAuthenticated } = this.props.auth0;
  
  return (

      <>
        <Router>
        <Header/>
        
        <Routes>

          
            {isAuthenticated?<><Route 
                exact path="/"
                element={<Digimons/>}
              >
              </Route>
              <Route 
                exact path="/mydigimons"
                element={<FavDigimons/>}
              >
              </Route></>:<Route exact path="/"
                    element={<WelcomePage/>}         >
          
        
      </Route>   }
      

              </Routes>
             
          
        </Router>
      
      
      </>
    
        
    
    )
  }

}

export default withAuth0(App);
