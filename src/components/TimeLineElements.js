import React from "react";
import { VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import firebase from '../firebase';

class TimeLineElements extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: []
    }
  }
  async componentDidMount() {
    let jobs = []
    await firebase.firestore().collection('jobs').get().then(querySnapshot => {
        querySnapshot.forEach((doc) => {
            if (doc.data().date_end === "Atualmente") doc.data().date_end = new Date()
            else doc.data().date_end = new Date(doc.data().date_end)
            jobs.push(doc.data())
        })
    })
    jobs.sort(function(a, b){
        if (a.date_end > b.date_end) return -1
        if (a.date_end < b.date_end) return 1
        return 0
    })
    this.setState({jobs: jobs})
  }
  render() {
    let dateColor = window.screen.width > 768 ? "blue-grey-text" : ""
    
    return (
        <>
            {this.state.jobs.map((job, index) => (
                <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#607d8b ', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  #607d8b ' }}
                    dateClassName={`${dateColor} ${index % 2 === 0 ? "text-left" : "text-right"}`}
                    date={`${job.date_start.substring(0, 7)} / ${job.date_end === "Atualmente" ? job.date_end : job.date_end.substring(0, 7)}`}
                    iconStyle={{
                        background: 'transparent', color: '#fff',
                        backgroundImage: `url(${job.url})`,
                        backgroundSize: "cover",
                        borderRadius: 0,
                        boxShadow: "none"
                    }}
                >
                    <h3 className="vertical-timeline-element-title">{job.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{job.subtitle}</h4>
                    {job.description.map((description, index) => (
                        <p key={index} className="text-left">{description}</p>
                    ))}
                </VerticalTimelineElement>
            ))}
        </>
    )
  }
}

export default TimeLineElements