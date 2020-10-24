import React from "react";
import { Link } from "react-router-dom"
import section1_img from "../imgs/section1_img.jpg"
import section2_img from "../imgs/section2_img.jpg"
import section3_img from "../imgs/section3_img.jpg"


class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks: [] };
        this.taskName = React.createRef();
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="row text-center landingBanner">
                            <div className="col">
                                <h3> Support Local Artists!</h3>
                            </div>
                            <div className="row heroFooter">
                                <div className="col-4 join " >
                                    <h2>Join Now!</h2>
                                    <p>create an account and connect with other local Artists. Network with each other to peek the interest of venues and agencies looking for talent. </p>
                                    <Link to="/signup">
                                        <button id="editProfileBtn">Sign Up</button></Link>
                                </div>

                            </div>
                        </div>
                        <div className="row landingHeader">
                            <div className="col aboutHeading justify-content-between">
                                <h3>How it works.</h3>
                            </div>
                        </div>
                        <div className="row aboutSection">
                            <div className="col-4 section1">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <h3>Step 1.</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <img src={section1_img} alt="Community_Artists"></img>
                                        <p> Create your profile to show off your talent and experience that will apeal to your peers and other agencies.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4  section2">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <h3>Step 2.</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <img src={section2_img} alt="Community_Artists"></img>
                                        <p> Earn points as you build your network with other artists. Gain points for following, posting, sharing your content and recruiting others.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4  section3">
                                <div className="row">
                                    <div className="col d-flex justify-content-center">
                                        <h3>Step 3.</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <img src={section3_img} alt="Community_Artists"></img>
                                        <p> Leverage your points and network with agencies to negociate better pricing and rates for your services.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row featured">
                            <div className="col">
                                <div className="row landingHeader">
                                    <div className="col d-flex justify-content-center">
                                        <h3>FEATURED ARTISTS</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Landing;
