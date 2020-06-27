import React from "react";
import {
  MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBAnimation, MDBIcon,
  MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn, MDBInput
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from '../firebase';
import swal from 'sweetalert';

class NavBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        imgTopUrl: "",
        isOpen: false,
        modal: false,
        comments: [],
        name: "",
        comment: ""
      };
      
      window.onscroll = () => {
        if (window.pageYOffset > window.screen.height * 0.9) {
            document.getElementById("navBar").style.zIndex = 20
            document.getElementById("navBar").style.position = "fixed"
            document.getElementById("navBar").style.top = 0
            document.getElementById("navBar").style.backgroundColor = "#fafafa"
            document.getElementById("navBar").classList.remove("navbar-dark")
            document.getElementById("navBar").classList.remove("mt-5")
            document.getElementById("navBar").classList.add("navbar-light")
            document.getElementById("navBar").style.left = "50%"
            document.getElementById("navBar").style.transform = "translateX(-50%)"
            if(window.screen.width < 768) {
              document.getElementById("navBar").style.placeSelf = "baseline"
              document.getElementById("navBar").style.left = ""
              document.getElementById("navBar").style.transform = "none"
            }
            document.getElementsByClassName("fa-envelope")[0].classList.remove("text-white")
            document.getElementsByClassName("fa-envelope")[0].classList.add("text-dark")
        } else {
            if(window.screen.width < 768) {
              document.getElementById("navBar").style.placeSelf = "baseline center"
              document.getElementById("navBar").style.left = "50%"
              document.getElementById("navBar").style.transform = "translateX(-50%)"
            }
            // document.getElementById("navBar").style.left = "0"
            // document.getElementById("navBar").style.transform = "none"
            document.getElementById("navBar").style.zIndex = 20
            document.getElementById("navBar").style.position = "absolute"
            document.getElementById("navBar").style.backgroundColor = "transparent"
            document.getElementById("navBar").classList.remove("navbar-light")
            document.getElementById("navBar").classList.add("navbar-dark")
            document.getElementById("navBar").classList.add("mt-5")
            document.getElementsByClassName("fa-envelope")[0].classList.remove("text-dark")
            document.getElementsByClassName("fa-envelope")[0].classList.add("text-white")
          }
      }
  }

  async componentDidMount() {
    let comments = []
    await firebase.firestore().collection('comments').get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        comments.push(doc.data())
      })
    })
    comments.sort(function(a, b){
      if (a.date > b.date) return 1
      if (a.date < b.date) return -1
      return 0
    })
    this.setState({comments: comments})
  }

  toggleCollapse = () => {
    if(this.state.isOpen === false && window.pageYOffset < window.screen.height/2) document.getElementsByClassName("navbar-nav")[0].classList.add("rgba-black-strong")
    else document.getElementsByClassName("navbar-nav")[0].classList.remove("rgba-black-strong")
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
    
    setTimeout(() => {
      if (this.state.modal === true) {
        if (document.getElementsByClassName("md-form")[0].classList.length === 1) {
          document.getElementsByClassName("md-form")[0].classList.add("m-0")
          document.getElementsByClassName("md-form")[1].classList.add("m-0")
        }
      }
    }, 1000)
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submit = (event) => {
    event.preventDefault();
    event.target.className += " was-validated";
    if (this.state.comment !== "") {
      firebase.firestore().collection("comments").add({
        author: this.state.name === "" ? "Anônimo" : this.state.name,
        text: this.state.comment,
        date: new Date()
      })
      .then(() => {
        swal({
          title: "Obrigado!",
          text: "Seu feedback é muito importante!",
          icon: "success",
          buttons: { cancel: "Fechar" },
          closeOnClickOutside: false,
          closeOnEsc: false
        })
        .then(() => {
          window.location.reload()
        })
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      })
    }
  }

  handleScroll(id, e){
    const item = document.getElementById(id)
    window.scroll({top: item.offsetTop, left: 0, behavior: 'smooth'})
    for (const el of document.getElementsByClassName("nav-item active")) {
      el.classList.remove("active")
    }
    e.target.parentElement.classList.add("active")
    if(this.state.isOpen === true) this.setState({ isOpen: !this.state.isOpen });
  }
  
  render() {
    return (
        <div id="init" style={{position: "relative", height: "100vh", display: "grid"}}>
            <Router>
                <MDBNavbar id="navBar" className="mt-5" color="transparent" dark expand="md" style={{alignSelf: "baseline", justifySelf: "center", zIndex: 20}}>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" className="justify-content-center" isOpen={this.state.isOpen} navbar>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <MDBNavLink to="" onClick={this.handleScroll.bind(this, 'home')}>Início</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#about" onClick={this.handleScroll.bind(this, 'about')}>Sobre</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#jobs" onClick={this.handleScroll.bind(this, 'jobs')}>Trabalhos</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#skills" onClick={this.handleScroll.bind(this, 'skills')}>Habilidades</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink to="#" onClick={this.toggleModal}>Opiniões</MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem className="d-flex flex-row align-items-center">
                                <MDBNavLink to="#contact" onClick={this.handleScroll.bind(this, 'contact')}>Contato</MDBNavLink>
                                <MDBAnimation className="d-flex flex-row justify-content-end" type="bounce" infinite>
                                    <a href="#contact">
                                        <MDBIcon className="ml-1 text-white" icon="envelope" />
                                    </a>
                                </MDBAnimation>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </Router>
            <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}   size="lg"  >
              <MDBModalHeader toggle={this.toggleModal} className="blue-grey lighten-2">
                Opiniões dos parceiros:
              </MDBModalHeader>
              <MDBModalBody className="blue-grey lighten-4">
                {this.state.comments.map((comment, index) => (
                  <div key={index} className="rounded border border-white blue-gray-text p-2 mb-2">
                    <p className="m-0">"{comment.text}" - {comment.author}</p>
                  </div>
                ))}
                <p className={`${this.state.comments.length > 0 ? "d-none" : ""}`}>Seja o primeiro a comentar!</p>
              </MDBModalBody>
              <MDBModalFooter className="blue-grey lighten-3 pb-0" style={{justifyContent: "space-evenly", alignItems: "end"}}>
                <form
                  className="needs-validation w-100 row align-items-end justify-content-between"
                  onSubmit={this.submit}
                  noValidate
                >
                  <div className="form-group w-75 mb-0">
                    <MDBInput value={this.state.name} name="name" onChange={this.changeHandler} className="w-50" label="Seu nome" />
                    <MDBInput value={this.state.comment} name="comment" required onChange={this.changeHandler} label="Deixe seu comentário*" />
                  </div>
                  <MDBBtn type="submit" outline rounded color="blue-grey">Enviar</MDBBtn>
                </form>
              </MDBModalFooter>
            </MDBModal>
        </div>
    )
  }
}

export default NavBar