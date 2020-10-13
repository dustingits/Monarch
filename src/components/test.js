import React from "react";
import {  MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

import '../task.min.css';
class Tester extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "1"
        };
        this.taskName = React.createRef();
    }

    profileToggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };






    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3 profileThumb">
                        tester
                    </div>

                    <div className="col profilePlate">
                        <div className="row">
                            <div className="col plateTitle">
                                <span>UserName</span>  <span>@username</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span>Rapper</span> <span>Singer</span> <span>Musician</span>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col follower">1</div>
                                    <div className="col follower">2</div>
                                    <div className="col follower">3</div>
                                </div>
                                <div className="row">
                                    <div className="col follower">Following</div>
                                    <div className="col follower">Followers</div>
                                    <div className="col follower">Posts</div>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col plateBio"> This is my auto biography to tell you about who i am and stuff.</div>
                            <div className="col"></div>

                        </div>
                        <div className="row">
                            <div className="col">
                                <ul className="social-list list-inline mt-3 mb-0">
                                    <li className="list-inline-item">
                                        <i className="fab fa-facebook"></i>
                                    </li>
                                    <li className="list-inline-item">
                                        <i className="fab fa-google"></i>
                                    </li>
                                    <li className="list-inline-item">
                                        <i className="fab fa-twitter"></i>
                                    </li>

                                </ul>


                            </div>
                            <div className="col">
                                <button className="btn btn-info ">Follow</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                <MDBNav className="nav-tabs ">
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.profileToggle("1")} role="tab" >
                                    My Posts
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.profileToggle("2")} role="tab" >
                                    Community
                            </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={this.state.activeItem === "3"} onClick={this.profileToggle("3")} role="tab" >
                                    What's new
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={this.state.activeItem} >
                            <MDBTabPane className="tabPane" tabId="1" role="tabpanel">
                                posjdfposadjfopsadjfapsdjfapsodjfasopjfaspdofa
                                apoisjdfpoasjdfopasjdfoasjdfoajsdofjasdojfaospdjf
                                aspdofjasodfjaosdjfpsodajfpaosdjfaospdjfpasodjfs
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel">
                            </MDBTabPane>
                            sdfaspocjsopdijfaspodjfioasdjfopsdjfopsjdofjsodpfj
                            sdpofijasdfopsjdofjsdoafjsodjfaospdjfoasdjfospidjfs
                            aspdofjasodpfjasopdjfposdjfpsoidjfs
                            <MDBTabPane tabId="3" role="tabpanel">
                            </MDBTabPane>
                        </MDBTabContent>
                </div>

            </div>
        );
    }
}

export default Tester;