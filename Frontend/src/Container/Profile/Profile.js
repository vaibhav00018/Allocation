import React from 'react'
import { connect } from 'react-redux';

import {FetchProfileData, AddProfileData} from './ProfileAction'

const mapStateToProps = (state) => {
  return {
    profileData : state.ProfileReducer.profileData
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    FetchProfileData: () => {
      dispatch(FetchProfileData());
    },

    AddProfileData:(profileData)=>{
      dispatch(AddProfileData(profileData))
    }
    
  };
};

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      newProfile: []
    }

    this.SaveProfile = this.SaveProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  SaveProfile(e) {
      let techs = e.target.techStack.value.split(' ');
      this.state.newProfile.push({
        name: e.target.employee_Name.value,
        band: e.target.band.value,
        techstack: techs
      });
      this.setState({
        profile: [this.state.profile, ...this.state.newProfile]
      })
      console.log(this.state.profile);
      this.props.AddProfileData(...this.state.newProfile);
      this.setState({
        newProfile: []
      })
      console.log(this.state.profile);
      e.target.employee_Name.value = "";
      e.target.band.value = "";
      e.target.techStack.value = "";
  
      e.preventDefault();
    }

  handleChange(e) {
  }

  
  render() {
    return(
      <React.Fragment>
        <div className="container">
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Item</button>
          <input type="text" className="txt" onChange={this.InputHandler} style={{ margin: "3em", padding: '2px' }} placeholder="Search"></input>
          <form onSubmit={this.SaveProfile}>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4>Add item to list</h4>
                  </div>
                  <div className="modal-body">
                  <div className="form-group">
                      <label>Employee Name</label>
                      <input type="text" className="form-control" placeholder="Employee Name" id="employee_Name" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                      <label>Employee Band</label>
                      <input type="text" className="form-control" placeholder="Band" id="band" onChange={this.handleChange}></input>

                    </div>
                    <div className="form-group">
                      <label>TechStack</label>
                      <input type="text" className="form-control" placeholder="TechStack" id="techStack" onChange={this.handleChange}></input>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input type="submit" value="Submit" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Band</th>
              <th scope="col">Tech Stack</th>
            </tr>
          </thead>
          <tbody>

            {this.props.profileData.map(function (name, index) {
                return (<tr>
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td>
                    {name.name}
                  </td>
                  <td>
                    {name.band}
                  </td>
                  <td>
                 
                  {name.techstack.map(function(tech ,index){
                    return(
                        <a className="btn-sm btn-info techButton">
                          {tech}
                        </a>
                    );
                  })}
                  </td>
                  <td>
                  </td>
                </tr>);
              })}

          </tbody>
        </table>
        <div>

        </div>
      </React.Fragment>
    )
  }

  componentDidMount() {
    this.props.FetchProfileData();    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);