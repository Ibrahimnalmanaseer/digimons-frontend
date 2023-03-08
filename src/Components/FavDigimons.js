import React from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DetailsDigimon from "./DetailsDigimon";
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col } from 'react-bootstrap';
import '../Styles/Cards.css'

class FavDigimons extends React.Component{


    constructor(){

        super()
        this.state={


            myDigimons:[],
            show:false,
            selectedDigimon: null
        }
    }



    componentDidMount = ()=>{

        const { user } = this.props.auth0;
        

        // send a request to get user's fav digimons
        axios
        .get(`http://54.82.49.251:8000/api/v1/digimons/?email=${user.email}`)
        .then((result)=>{
            this.setState({
                myDigimons:result.data
            });
            console.log("Response status:", result.status)
        })
        .catch((err) => {
            console.log("Error message:", err.message);
            console.log("Error status:", err.response.status);
        });

    }






    handleDeleteDigimon = (id) => {


        axios
          .delete(`http://54.82.49.251:8000/api/v1/digimons/${id}`)
          .then((result) => {
            console.log("Response status:", result.status);
            
            const updatedItems = this.state.myDigimons.filter(item => item.id !== id);
            this.setState({ myDigimons: updatedItems });
          })
          .catch((err) => {
            console.log("Error message:", err.message);
            console.log("Error status:", err.response.status);
          });
      };



    handleOpenModal=(digimon)=>{


        this.setState({

            show:true,
            selectedDigimon: digimon
        })

        console.log(this.state.show)
    }

    handelCloseModal=()=>{

        this.setState({
          show:false,
          selectedDigimon: null
        })
        console.log(this.state.show)
    
    }

        
    updateMyDigimonsInfo=(data)=>{

        this.setState({
            myDigimons:data

        })
      
       }
   

    render(){

        

        return (
            <>
            <Container  className="container-style text-center">
                    <Row> 


              {this.state.myDigimons.length > 0 ? (
                this.state.myDigimons.sort((a, b) => a.id - b.id).map((item) => (


                <Col  className="text-center" >
                  <Card className='card-style' style={{ width: '18rem' }}>
                  <div className="overflow">
                    <Card.Img variant="top" src={item.img}  className='card-img-top'/>
                    </div>
                    <Card.Body className='card-body'>
                      <Card.Title ><h1>{item.name}</h1></Card.Title>
                      <Card.Text>{item.level}</Card.Text>
                      <div className="bottom-div">
                      <Button
                        variant="danger" className="btn btn-delete mr-2"
                        onClick={() => this.handleDeleteDigimon(item.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="primary" className="btn btn-update"
                        onClick={() => this.handleOpenModal(item)}
                      >
                        Update
                      </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>))  
              ) : (
                <p>No Digimons Available.</p>
              )}


          
              {this.state.selectedDigimon && (
                <DetailsDigimon
                  digimonInfo={this.state.selectedDigimon}
                  show={this.state.show}
                  closeModal={this.handelCloseModal}
                  updateMyDigimonsInfo={this.updateMyDigimonsInfo}
                />
              )}
               </Row>
                </Container>
            </>
          );
          

    }
}

export default withAuth0(FavDigimons);