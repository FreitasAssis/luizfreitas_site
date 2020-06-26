import React from "react";
import { MDBJumbotron, MDBBtn, MDBIcon, MDBView, MDBMask, MDBCarouselCaption, MDBCarousel, MDBCarouselInner, MDBCarouselItem } from "mdbreact";
import firebase from '../firebase';

class Skills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          skills: [],
        };
    }
    async componentDidMount() {
      let skills = []
      await firebase.firestore().collection('habilidades').get().then(querySnapshot => {
          querySnapshot.forEach((doc) => {
              skills.push(doc.data())
          })
      })
      skills.sort(function(a, b){
          if (a.title > b.title) return 1
          if (a.title < b.title) return -1
          return 0
      })
      this.setState({skills: skills})
    }
    render() {
        return (
          <MDBJumbotron id="skills" rounded fluid className="p-1 blue-grey-text">
              <h3 className="font-weight-bold m-2 text-center">
                <MDBIcon icon="book-open" />
                <strong className="ml-2">Habilidades</strong>
              </h3>
              <MDBCarousel
                activeItem={1}
                length={this.state.skills.length}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
              >
                <MDBCarouselInner>
                  {this.state.skills.map((skill, index) => (
                    <MDBCarouselItem key={index} itemId={index+1}>
                      <MDBView>
                        <img
                          className="d-block p-3"
                          style={{width: "auto", height: "10rem"}}
                          src={skill.url_icon}
                          alt={`Slide number ${index+1}`}
                        />
                        <MDBMask overlay="blue-grey-light" />
                      </MDBView>
                      <MDBCarouselCaption>
                        <h3 className={`h3-responsive ${skill.url_cert === "" ? "mb-5" : ""}`}>{skill.title}</h3>
                        <MDBBtn href={skill.url_cert} target="_blank" className={skill.url_cert === "" ? "d-none" : ""} color="blue" outline>Certificado</MDBBtn>
                      </MDBCarouselCaption>
                    </MDBCarouselItem>
                  ))}
                </MDBCarouselInner>
              </MDBCarousel>
          </MDBJumbotron>
        )
    }
}

export default Skills