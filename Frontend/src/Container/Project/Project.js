import React from 'react'
import { connect } from 'react-redux';

import { FetchProjectData, AddProjectData } from './ProjectAction'

const mapStateToProps = (state) => {
  return {
    projectData: state.ProjectReducer.projectData
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    FetchProjectData: () => {
      dispatch(FetchProjectData());
    },

    AddProjectData: (project) => {
      dispatch(AddProjectData(project))
    }

  };
};

class Project extends React.Component {

  constructor() {
    super();
    this.state = {
      project: [],
      newProject: []
    }

    this.SaveProject = this.SaveProject.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  SaveProject(e) {
    let techs = e.target.techstack.value.split(' ');
    this.state.newProject.push({
      name: e.target.projectname.value,
      requirement: e.target.requirement.value,
      techstack: techs
    });

    this.setState({
      project: [this.state.project, ...this.state.newProject]
    })

    this.props.AddProjectData(...this.state.newProject);

    this.setState({
      newProject: []
    })
    console.log(this.state.project);
    e.target.projectname.value = "";
    e.target.requirement.value = "";
    e.target.techstack.value = "";

    e.preventDefault();
  }

  handleChange(e) {

    //console.log(e.target);
  }
  render() {
    return (
      <React.Fragment>
        <div className="container">

          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Project</button>
          <input type="text" className="txt" onChange={this.InputHandler} style={{ margin: "3em", padding: '2px' }} placeholder="Search"></input>
          <form onSubmit={this.SaveProject}>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4>Add item to list</h4>
                  </div>
                  <div className="modal-body">

                    <div className="form-group">
                      <label>Project Name</label>
                      <input type="text" className="form-control" placeholder="Product Name" id="projectname" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                      <label>Requirement</label>
                      <input type="text" className="form-control" placeholder="Requirement" id="requirement" onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group" >
                      <label>Tech Stack</label>
                      <input type="text" className="form-control" placeholder="Tech Stack" id="techstack" onChange={this.handleChange}></input>
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
              <th scope="col">ProjectName</th>
              <th scope="col">Requirement</th>
              <th scope="col">Tech Stack</th>
              <th scope="col">Open for Opportunity</th>

            </tr>
          </thead>
          <tbody>

            {this.props.projectData//.filter(x => x.Product.includes(this.state.input))
              .map(function (name, index) {
                return (<tr>
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td>
                    {name.name}
                  </td>
                  <td>
                    {name.requirement}
                  </td>
                  <td>

                    {name.techstack.map(function (tech, index) {
                      return (
                        <a className="btn-sm btn-info techButton">
                          {tech}
                        </a>
                      );
                    })}
                  </td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={name.open=="true"?"checked":""}  />
                      <span className="slider round"></span>
                    </label>
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
    this.props.FetchProjectData();
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);