import React from 'react';
import HOC from '../../HOC/HOC'
import '../../App.css'
import Dashboard from '../../Container/Dashboard/Dashboard';
import Meetings from '../../Container/Meetings/Meetings';
import Stock from '../../Container/Stock/Stock';
import { connect } from 'react-redux';


import { Route, BrowserRouter as Router } from 'react-router-dom';

const mapStateToProps = (state) => {
    return {
        count: state.StockReducer.count,
    }
}
class layout extends React.Component {
   
    render() {
        return (
            <HOC>
                <Router>
                    <div id="throbber" ></div>
                    <div id="noty-holder"></div>
                    <div id="wrapper">

                        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">

                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="http://cijulenlinea.ucr.ac.cr/dev-users/">
                                    <h3 className="">My Home</h3>
                                </a>
                            </div>

                            <ul className='nav navbar-right top-nav'>
                           
                                <li className="dropdown">
                                    <a href="/#" className="dropdown-toggle" data-toggle="dropdown">Admin User <b className="fa fa-angle-down"></b></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="/#"><i className="fa fa-fw fa-user"></i> Edit Profile</a></li>
                                        <li><a href="/#"><i className="fa fa-fw fa-cog"></i> Change Password</a></li>
                                        <li className="divider"></li>
                                        <li><a href="/#"><i className="fa fa-fw fa-power-off"></i> Logout</a></li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="collapse navbar-collapse navbar-ex1-collapse">
                                <ul className="nav navbar-nav side-nav">
                                    <li>
                                        <a href="/Dashboard" data-toggle="collapse" data-target="#submenu-1"><i className="fa fa-fw fa-search"></i> Dashboard<i className="fa fa-fw fa-angle-down pull-right"></i></a>
                                        <ul id="submenu-1" className="collapse">
                                            <li><a href="/#"><i className="fa fa-angle-double-right"></i> SUBMENU 1.1</a></li>
                                            <li><a href="/#"><i className="fa fa-angle-double-right"></i> SUBMENU 1.2</a></li>
                                            <li><a href="/#"><i className="fa fa-angle-double-right"></i> SUBMENU 1.3</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/Meetings" data-toggle="collapse" data-target="#submenu-2"><i className="fa fa-fw fa-star"></i>  Meeting <i className="fa fa-fw fa-angle-down pull-right"></i></a>
                                        <ul id="submenu-2" className="collapse">
                                            <li><a href="/#"><i className="fa fa-angle-double-right"></i> SUBMENU 2.1</a></li>
                                            <li><a href="/#"><i className="fa fa-angle-double-right"></i> SUBMENU 2.2</a></li>
                                            <li><a href="/#"><i className="fa fa-angle-double-right"></i> SUBMENU 2.3</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/Stock"><i className="fa fa-fw fa-user-plus"></i>  Stocks</a>
                                    </li>
                                    <li>
                                        <a href="sugerencias"><i className="fa fa-fw fa-paper-plane-o"></i> MENU 4</a>
                                    </li>
                                    <li>
                                        <a href="faq"><i className="fa fa-fw fa fa-question-circle"></i> MENU 5</a>
                                    </li>
                                </ul>
                            </div>

                        </nav>

                        <div id="page-wrapper">
                            <div className="container-fluid">

                                <div className="row" id="main" >
                                    <Route exact path='/' component={Dashboard} />
                                    <Route path='/Dashboard' component={Dashboard} />
                                    <Route path='/Meetings' component={Meetings} />
                                    <Route path='/Stock' component={Stock} />

                                </div>
                            </div>

                        </div>

                    </div>
                </Router>
            </HOC>
        )
    }
};

export default connect(mapStateToProps)(layout);
