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

    AddProjectData:(NewItem)=>{
      dispatch(AddProfileData(NewItem))
    }
    
  };
};




class Profile extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className="container">
          <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Item</button>
          <input type="text" className="txt" onChange={this.InputHandler} style={{ margin: "3em", padding: '2px' }} placeholder="Search"></input>
          <form onSubmit={this.AddItem}>
            <div className="modal fade" id="myModal" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4>Add item to list</h4>
                  </div>
                  <div className="modal-body">
                    <div>
                      <input type="text" placeholder="id" id="id"></input>
                    </div>
                    <div>
                      <input type="text" placeholder="Product Name" id="Project Name"></input>
                    </div>
                    <div>
                      <input type="text" placeholder="Quantity" id="quantity"></input>

                    </div>
                    <div>
                      <input type="text" placeholder="Category" id="category"></input>
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
              <th scope="col">Name</th>
              <th scope="col">Band</th>
              <th scope="col">Tech Stack</th>
            </tr>
          </thead>
          <tbody>

            {this.props.profileData//.filter(x => x.Product.includes(this.state.input))
              .map(function (name, index) {
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
                 
                  {name.techStack.map(function(tech ,index){
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