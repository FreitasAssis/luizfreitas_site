import React from "react";
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBCardBody, MDBCardText } from "mdbreact";
import firebase from '../firebase';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          imgUrl: "",
          idade: 0,
          timeJob: 0
        };
    }
    async componentDidMount() {
        await firebase.storage().ref().child('images/rosto.png').getDownloadURL().then((url) => { this.setState({imgUrl: url}) })
        var year = new Date().getFullYear()
        this.setState({idade: year - 1984, timeJob: year - 2017})
    }
    render() {
        return (
            <MDBContainer id="about" className="mt-5 text-center" style={{display: "grid", height: "100vh"}}>
                <div style={{
                    backgroundImage: `url(${this.state.imgUrl})`,
                    backgroundColor: "grey",
                    borderRadius: "50%",
                    backgroundSize: "cover",
                    backgroundPosition: "1px",
                    width: "15vw",
                    height: "15vw",
                    justifySelf: "center",
                    top: "45%",
                    zIndex: 1
                }} className="col-7 col-md-5 d-none d-md-flex">
                </div>
                <MDBRow className="w-responsive" style={{justifySelf: "center"}}>
                    <MDBCol>
                        <MDBJumbotron className="text-center">
                            <MDBCardBody>
                                <MDBCardTitle className="blue-grey-text h5 m-5">
                                    Sobre
                                </MDBCardTitle>
                                <MDBCardText>
                                    Casado, {this.state.idade} anos, músico e apaixonado por tecnologias inovadoras.<br/>
                                    Trabalho com programação há mais de {this.state.timeJob} anos, e nesse período participei de projetos variados, construção de sites, sistemas, aplicativos...<br/>
                                    Um deles é a Boomer, onde comecei como estagiário na área de programação e hoje sou dev full stack.<br/>
                                    Microempreendedor, com o CNPJ: 36.124.707/0001-57. <br/>
                                    Quer saber mais? Na sequência detalho um pouco mais dos meus trabalhos.
                                </MDBCardText>
                            </MDBCardBody>
                        </MDBJumbotron>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default About;