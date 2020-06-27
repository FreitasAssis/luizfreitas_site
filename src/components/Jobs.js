import React from "react";
import { MDBContainer, MDBIcon, MDBView, MDBMask } from "mdbreact";
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import firebase from '../firebase';

import TimeLineElements from './TimeLineElements'

class Jobs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: "",
      isOpen: false
    }
  }
  async componentDidMount() {
    await firebase.storage().ref().child('images/programacao.jpg').getDownloadURL().then((url) => { this.setState({image: url}) })
  }
  render() {
    const container = {
        maxWidth: '100%',
        height: '5em'
    };
    return (
      <>
        <MDBContainer id="jobs" style={container} className="w-100 pl-0 pr-0 text-center">
          <MDBView className="h-100 text-white">
            <img src={this.state.image} className="img-fluid w-100" alt="sample image" />
            <MDBMask className="flex-center" pattern={6} overlay="red-strong" >
              <div className="w-100">
                <h3 className="font-weight-bold m-2">
                  <MDBIcon far icon="file-code" />
                  <strong className="ml-2">Projetos</strong>
                </h3>
              </div>
            </MDBMask>
          </MDBView>
        </MDBContainer>
        <VerticalTimeline>
          <TimeLineElements/>
        </VerticalTimeline>
      </>
    )
  }
}

export default Jobs