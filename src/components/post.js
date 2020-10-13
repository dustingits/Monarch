import React from "react";
import axios from "axios";
import '../task.min.css';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
    this.taskName = React.createRef();
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Java Spring Boot uses port 8080
    //let url = "http://localhost:8080/tasks";

    // C# dotnetcore uses port 5000
    //let url = "http://localhost:5000/projects";

    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/tasks";
    axios.get(url).then(response => this.setState({ tasks: response.data }));
  };

  addTask = () => {
    let url = "http://localhost:3001/tasks";
    axios.post(url, { name: this.taskName.current.value }).then(response => {
      // refresh the data
      this.getData();
      // empty the input
      this.taskName.current.value = "";
    });
  };


  render() {
    return (

    <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
          waves />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
          <MDBBtn href="#">Click</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

}

export default Post;
