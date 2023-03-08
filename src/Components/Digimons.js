import React from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { withAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col,Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../Styles/Cards.css'

class Digimons extends React.Component{


    constructor(){

        super()
        this.state={


            digimonsApiData:[],
         
        }
    }



    componentDidMount = ()=>{

        axios
        .get('https://digimon-api.vercel.app/api/digimon')
        .then((result)=>{
            this.setState({
                digimonsApiData:result.data
            });
            console.log("Response status:", result.status)
        })
        .catch((err) => {
            console.log("Error message:", err.message);
            console.log("Error status:", err.response.status);
        });

    }



    handleFavDigimon=(event)=>{

        const { user } = this.props.auth0;
        event.email=user.email
        console.log(event)
        axios
        .post('http://52.91.116.114:8000/api/v1/digimons/',event)
        .then((re)=>{

            console.log("Response status:", re.status)
        })
        .catch((err)=>{

            console.log("Error message:", err.message);
            console.log("Error status:", err.response.status);
        })

        Swal.fire({
            title: "succeed ! ",
            text: "The Didgimon Was Added Successfully",
            icon: "success",
            button: "Continue",
            confirmButtonColor: '#3E54AC',

          });
          
    }



    render(){

        

            return(

                
                <Container  className="container-style text-center">
                    <Row> 
                {this.state.digimonsApiData.map((item)=>{

                   return (
                   
                   <Col  className="text-center" >
                   <Card  className='card-style' style={{ width: '18rem' }}>

                    <div className="overflow">
                        <Card.Img variant="top" src={item.img} className='card-img-top'/>
                    </div>
                        <Card.Body className='card-body'>
                        <Card.Title ><h1>{item.name}</h1></Card.Title>
                        <Card.Text >
                            {item.level}
                        </Card.Text>
                        
                        <Button  variant="outline-primary" onClick={()=>this.handleFavDigimon(item)} >Add Fav</Button>
                        </Card.Body>
                        </Card>
                        </Col>
                        
                        )

                })}


                </Row>
                </Container>
               
            )

    }
}

export default withAuth0(Digimons)