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
      projectname: "",
      requirement: "",
      techstack: "",
      newProject: [],
      open: "true",
      mode: "create"
    }

    this.SaveProject = this.SaveProject.bind(this);
    this.UpdateProject = this.UpdateProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.initialFormState = this.initialFormState.bind(this);

    this.edit = this.edit.bind(this);
  }

  initialFormState() {
    this.setState({
      mode: "create",
      projectname: "",
      requirement: "",
      techstack: "",
      open: "true"
    })


  }
  edit(item) {

    this.setState({
      mode: "update",
      projectname: item.name,
      requirement: item.requirement,
      open: item.open,
      techstack: item.techstack.map((tech) => tech + " ")
    })

    console.log(item);
  }

  
  SaveProject(e) {
    let techs = e.target.techstack.value.split(' ');
    this.state.newProject.push({
      name: e.target.projectname.value,
      requirement: e.target.requirement.value,
      open: e.target.open.checked == true ? "true" : "false",
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
    e.target.open = "true"
    e.preventDefault();
  }



  UpdateProject() {

    console.log("Has to update")
  }

  handleChange(evt) {
    this.setState({ [evt.target.id]: evt.target.value });

  }
  render() {
    return (
      <React.Fragment>
        <div className="container">

          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" onClick={this.initialFormState}>Add Project</button>
          <input type="text" className="txt" onChange={this.InputHandler} style={{ margin: "3em", padding: '2px' }} placeholder="Search"></input>
          <form onSubmit={this.state.mode == "create" ? this.SaveProject : this.UpdateProject}>
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
                      <input type="text" className="form-control" placeholder="Product Name" id="projectname" onChange={this.handleChange.bind(this)} value={this.state.projectname}></input>
                    </div>
                    <div className="form-group">
                      <label>Requirement</label>
                      <input type="text" className="form-control" placeholder="Requirement" id="requirement" onChange={this.handleChange.bind(this)} value={this.state.requirement}></input>
                    </div>
                    <div className="form-group" >
                      <label>Tech Stack</label>
                      <input type="text" className="form-control" placeholder="Tech Stack" id="techstack" onChange={this.handleChange.bind(this)} value={this.state.techstack}></input>
                    </div>
                    <div className="form-group" >
                      <label>Open</label>
                      
                        <label className="switch">
                          <input type="checkbox" id="open"  checked={this.state.open == "true" ? "checked" : ""}/>
                          <span className="slider round"></span>
                        </label>
                     
                    </div>
                  </div>

                  <div className="modal-footer">

                    <input type="submit" value="Save" />
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
              .map(function (item, index) {
                return (<tr>
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td>
                    <a data-toggle="modal" data-target="#myModal" onClick={() => {
                      debugger;
                      { this.edit(item) }
                      console.log(this)
                    }}>{item.name} </a>
                  </td>
                  <td>
                    {item.requirement}
                  </td>
                  <td>

                    {item.techstack.map(function (tech, index) {
                      return (
                        <a className="btn-sm btn-info techButton">
                          {tech}
                        </a>
                      );
                    })}
                  </td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" defaultChecked={item.open == "true" ? "checked" : ""} />
                      <span className="slider round"></span>
                    </label>
                  </td>
                </tr>);
              }, this)}
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