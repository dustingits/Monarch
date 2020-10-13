import React from "react";
import '../css/profile.css';
import { connect } from 'react-redux';
import MyPostsList from './myPostsList';
import { Redirect } from 'react-router';
import {  MDBCol, MDBBadge, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import UpdateProfileModal from './updateProfileModal';
import CommunityList from "./communityList";
import { loadCommunity, followMember,unfollowMember } from '../actions/userActions';
import { createComment, loadPosts } from '../actions/postActions';
import { loadUser } from '../actions/authActions';
import OtherPostsList from './otherPostsList';
import MonarchMap from './map';


class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user,
            activeItem: "1",
            active: "user"
        }
    }
    componentDidMount() {
        this.props.loadPosts();


    }





    profileToggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };
    render() {
        if (!this.props.isAuthenticated) {
            return (<Redirect to='/login' />)
        }
        if (this.props.isLoading) {
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } else {


            return (





                <div className="container-lg">

                    <div className="row">
                        <div className="col-md-3 col-12 profileThumb">

                            
                            <img src={ this.props.active === 'user'? this.props.user.picture : this.props.member.picture} className="rounded-circle avatar-xl img-thumbnail " id="profile-thumbnail" alt="profile" />
                        </div>

                        <div id="profilePlate" className="col profilePlate">
                            <div className="row plateTitle">
                                <div className="col ">
                                    <h3>
                                        {this.props.active === 'user' ? this.props.user.username
                                            :
                                            this.props.member.username}
                                    </h3>
                                    </div>
                                    <div className="col">
                                    <div className="row">
                                        <div className="col following">

                                            {this.props.active === 'user' ? this.props.user.following.length
                                                :
                                                this.props.member.following.length}

                                        </div>
                                        <div className="col follower">
                                            {this.props.active === 'user' ? this.props.user.followers.length
                                                :
                                                this.props.member.followers.length}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col following">Following</div>
                                        <div className="col followers">Followers</div>
                                    </div>

                                
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    {/*If active profile is user */}
                                    {this.props.active === 'user' ?
                                        /*then map user categories into pill labels*/
                                        <div>{this.props.user.categories.map((category, index) => (
                                            <MDBBadge key={index} pill id="categoryPill" className="mx-2">{category}</MDBBadge>))}
                                        </div>
                                        // or if they are member map member categories
                                        :
                                        <div>{this.props.member.categories.map((category, index) => (
                                            <MDBBadge key={index} pill id="categoryPill" className="mx-2" >{category}</MDBBadge>))}
                                        </div>}
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col plateBio">
                                    {this.props.active === 'user' ? this.props.user.aboutme
                                        :
                                        this.props.member.aboutme}
                                </div>
                                <div className="col"></div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <ul className="social-list list-inline mt-3 mb-0">
                                        {this.props.user.facebook ?
                                            <li className="list-inline-item">
                                                <a href={this.props.user.facebook} target="_blank" rel="noopener noreferrer">  <i id="socialIcon" className="fab fa-facebook"></i></a>
                                            </li>
                                            : null}
                                        {this.props.user.instagram ?
                                            <li className="list-inline-item">
                                                <a href={this.props.user.instagram} target="_blank" rel="noopener noreferrer"> <i id="socialIcon" className="fab fa-instagram"></i></a>
                                            </li>
                                            : null
                                        }

                                    </ul>


                                </div>
                                <div className="col">

                                    {/*IF active profile is user load edit button */}
                                    {this.props.active === 'user' ? <UpdateProfileModal /> : ''}

                                </div>
                            </div>

                        </div>
                    </div>
                   

                    <div id="tabcontent" className="row justify-content-center">
                        <MDBCol className="col-10 col-sm-12 ">
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
                            <MDBTabContent className=" " activeItem={this.state.activeItem} >
                                <MDBTabPane className="tabPane " tabId="1" role="tabpanel">
                                    <MyPostsList posts={this.props.posts} />
                                </MDBTabPane>
                                <MDBTabPane tabId="2" role="tabpanel">
                                    <CommunityList members={this.props.members} />
                                </MDBTabPane>
                                <MDBTabPane tabId="3" role="tabpanel">
                                    <OtherPostsList posts={this.props.posts} />
                                </MDBTabPane>
                            </MDBTabContent>
                        </MDBCol>
                    </div>

                    <div id="mapDiv" className="row">
                        <div className="col">
                            <MonarchMap unfollowMember={this.props.unfollowMember} followMember={this.props.followMember} members={this.props.members} user={this.props.user}></MonarchMap>
                        </div>

                    </div>
                </div>


            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading,
        user: state.auth.user,
        member: state.users.profile,
        active: state.users.active,
        members: state.users.members,
        posts: state.posts.posts
    };
}
export default connect(mapStateToProps, { loadPosts, loadCommunity, createComment, loadUser, followMember,unfollowMember})(Profile);
