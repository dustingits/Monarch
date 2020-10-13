import React, { Component } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBNavbarToggler,
	MDBCollapse,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem,
	MDBIcon,
	MDBAnimation,
} from 'mdbreact';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import { getUserProfile } from '../actions/userActions';
import MonarchIcon from '../imgs/monarchIcon2.png';
class NavbarPage extends Component {
	state = {
		isOpen: false,
	};

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		return (
			<MDBNavbar color='default-color' dark expand='md'>
				<MDBNavbarBrand>
					<div className='row px-n1'>
						<div id='monarchIconCol' className='col px-n1'>
							<MDBAnimation type='slideInUp'>
								<MDBAnimation type='tada' onAnimationStart={this.onAnimationEnd} delay='2s'>
									<img id='monarchIcon' src={MonarchIcon} alt='monarch icon' />
								</MDBAnimation>
							</MDBAnimation>
						</div>

						<div id='monarchLogoCol' className='col brandLogo'>
							<h4 className='white-text brandText'>Monarch</h4>
							<h3 className='tagLine'>spread your wings.</h3>
						</div>
					</div>
				</MDBNavbarBrand>
				<MDBNavbarToggler onClick={this.toggleCollapse} />
				<MDBCollapse id='navbarCollapse3' isOpen={this.state.isOpen} navbar>
					<MDBNavbarNav left>
						<MDBNavItem>
							<MDBNavLink to='/createposts'>Create Post</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink to='/profile' onClick={this.props.getUserProfile}>
								Profile
							</MDBNavLink>
						</MDBNavItem>
					</MDBNavbarNav>
					<MDBNavbarNav right>
						<MDBNavItem>
							{/* if user is authenticated display logout else show dropdown loing/signup */}
							{this.props.isAuthenticated ? (
								<MDBNavLink to='#' onClick={this.props.logout}>
									Log Out
								</MDBNavLink>
							) : (
								<MDBDropdown>
									<MDBDropdownToggle nav caret>
										<MDBIcon icon='user' />
									</MDBDropdownToggle>
									<MDBDropdownMenu className='dropdown-info'>
										<MDBDropdownItem href='/signup'>Sign Up</MDBDropdownItem>
										<MDBDropdownItem href='/login'>Log In</MDBDropdownItem>
									</MDBDropdownMenu>
								</MDBDropdown>
							)}
						</MDBNavItem>
						<MDBNavItem></MDBNavItem>
					</MDBNavbarNav>
				</MDBCollapse>
			</MDBNavbar>
		);
	}
}
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	errors: state.errors,
});
export default connect(mapStateToProps, { logout, getUserProfile })(NavbarPage);
