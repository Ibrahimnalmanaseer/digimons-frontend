import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";


class DetailsDigimon extends React.Component {


  handleUpdate = async(event) => {

    const { user } = this.props.auth0;
    
    event.preventDefault();
    const digimonInfo = {
      email:user.email,
      name: event.target.name.value,
      img: event.target.img.value,
      level: event.target.level.value,
    };

    //update my favourite Digimons in database
    await axios
          .put(`http://52.91.116.114:8000/api/v1/digimons/${this.props.digimonInfo.id}`,digimonInfo)
          .then((result) => {
            console.log("Response status Update:", result.status);
            
            
          })
          .catch((err) => {
            console.log("Error message:", err.message);
            console.log("Error status:", err.response.status);
          });

      //Get all my favourite Digimons
    axios
          .get(`http://52.91.116.114:8000/api/v1/digimons/?email=${user.email}`)
          .then((result)=>{

              
              this.props.updateMyDigimonsInfo(result.data)
              console.log("Response status:", result.status)
              console.log("Response data:", result.data)
          })
          .catch((err) => {
              console.log("Error message:", err.message);
              console.log("Error status:", err.response.status);
          });    
  };


  

  render() {
    
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Digimon Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={(event) => {
    this.handleUpdate(event);
    this.props.closeModal()}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter Name" defaultValue={this.props.digimonInfo.name} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Img</Form.Label>
        <Form.Control type="text" name='img' placeholder="Enter img Url" defaultValue={this.props.digimonInfo.img} />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Level</Form.Label>
        <Form.Control type="text" name='level' placeholder="Enter digimon level" defaultValue={this.props.digimonInfo.level} />
        
      </Form.Group>
      <Button variant="primary"  type="submit" >
        Submit
      </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withAuth0(DetailsDigimon);
