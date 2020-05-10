import React, { Component } from 'react';
import { loginUser } from './LoginAction';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

const mapStateToProps = (state) => {
    return {
        loginData: state.LoginReducer.loginData,
        isAuthenticated: state.LoginReducer.isAuthenticated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        //   loginUser: () => {
        //     dispatch(FetchProfileData());
        //   },

        loginUser: (profileData) => {
            dispatch(loginUser(profileData))
        }

    };
};

class Login extends Component {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
    onChange(e) {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    };

    login(evt) {
        evt.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);

      this.props.loginUser(userData);

      
       

    }
    render() {
        return (
            <React.Fragment>
                {this.props.isAuthenticated ? this.props.history.push('/') : ""}
                <div>
                    <form onSubmit={this.login}>
                        <div >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">

                                        <h4>Login</h4>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input type="text" className="form-control" placeholder="vaibhav@gmail.com" id="email" onChange={this.onChange.bind(this)}></input>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="password" className="form-control" placeholder="test123" id="password" onChange={this.onChange}></input>

                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <input type="submit" className="btn btn-lg" value="Login" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                
                {/* <div>
                    <form onSubmit={this.login}>
                        <label>UserName</label>
                        <input type="text" id="email" onChange={this.onChange.bind(this)}></input>

                        <label>Password</label>
                        <input type="password" id="password" onChange={this.onChange}></input>
                        <button type="submit"> Login </button>
                    </form>
                </div> */}
            </div>
            </React.Fragment>

        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
