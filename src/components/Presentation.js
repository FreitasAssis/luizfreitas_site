import React from "react";
import {
  MDBContainer, MDBCard, MDBRow, MDBCol, MDBIcon 
} from "mdbreact";
import firebase from '../firebase';

class Presentation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgTopUrl: "",
      isOpen: false
    }
  }
  async componentDidMount() {
    function write () {
      var text = "DESENVOLVEDOR FULL STACK"
      var description = document.getElementById('description')
      var char = text.split('').reverse();
      var typer = setInterval(function() {
        if (!char.length) return clearInterval(typer);
        var next = char.pop();
        description.innerHTML += next;
      }, 200);
    }
    await firebase.storage().ref().child('images/header.jpg').getDownloadURL().then((url) => { this.setState({imgTopUrl: url}) })
    write()
  }
  
  render() {
    const container = {
        maxWidth: '100%',
        height: '100vh',
        position: "absolute"
    };
    return (
      <MDBContainer id="home" style={container} className="w-100 pl-0 pr-0 text-center">
        <MDBRow className="h-100 m-0">
          <MDBCol className="p-0">
            <MDBCard className="card-image h-100" style={{
                backgroundImage: `url(${this.state.imgTopUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "1px"
            }}>
              <div className="text-white text-center rgba-black-light rounded h-100" style={{display: "grid"}}>
                <div className="w-100" style={{alignSelf: "center", zIndex: 10}}>
                  <h6 className="grey-text">
                    <MDBIcon icon="laptop" />
                    <strong id="description" className="ml-2"></strong>
                  </h6>
                  <h3 className="py-3 font-weight-bold">
                    <strong>LUIZ FREITAS</strong>
                  </h3>
                  <MDBCol className="d-flex justify-content-center mt-4" md="12">
                    <MDBCol md="3" className="d-flex justify-content-around">
                      <a href="https://www.linkedin.com/in/luiz-dev/" target="_blank" rel="noopener noreferrer"><MDBIcon
                        fab
                        icon="linkedin-in"
                        className="grey-text"
                        size="lg"
                      /></a>
                      <a href="https://github.com/FreitasAssis/" target="_blank" rel="noopener noreferrer"><MDBIcon
                        fab
                        icon="github"
                        className="grey-text"
                        size="lg"
                      /></a>
                      <a href="https://www.instagram.com/luizfreitas.dev/" target="_blank" rel="noopener noreferrer"><MDBIcon
                        fab
                        icon="instagram"
                        className="grey-text"
                        size="lg"
                      /></a>
                    </MDBCol>
                  </MDBCol>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default Presentation;