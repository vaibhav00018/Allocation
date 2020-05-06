import React, { useState } from 'react'
import GetListOfItem from '../Service';
import AddEditPopup from './AddEditPopup'
import StockDetails from './StockDetails'
import { connect } from 'react-redux';
import { fetchDashboardStatisticsData, AddDashboardData  } from './StockAction';

const mapStateToProps = (state) => {
  return {
    count: state.StockReducer.count,
    stockData : state.StockReducer.stockData
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchDashboardStatisticsData: () => {
      dispatch(fetchDashboardStatisticsData());
    },

    AddDashboardData:(NewItem)=>{
      dispatch(AddDashboardData(NewItem))
    }
    
  };
};

class Stock extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ListOfItem: [],
      input: '',
      NewItem: []
    }

    
    this.AddItem = this.AddItem.bind(this);
    this.InputHandler = this.InputHandler.bind(this);
  
  }
  // ItemMenu = this.state.ListOfItem;


  AddItem(e) {
   
    this.state.NewItem.push({
      "Id": e.target.id.value,
      "Product": e.target.productName.value,
      "Category": e.target.category.value,
      "Available": e.target.quantity.value
    });
    this.props.AddDashboardData(this.state.NewItem);
    this.setState({
      NewItem:[]
    })
    e.preventDefault();
  }

  InputHandler(e) {
    e.preventDefault();
    console.log(this.state.input);
    this.setState({
      input: e.target.value
    })
  }

  render() {

    return (
      <React.Fragment>
        <div className="container">
          <h2>Modal Example</h2>
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
                      <input type="text" placeholder="Product Name" id="productName"></input>
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
              <th scope="col">Product</th>
              <th scope="col">Available</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>

            {this.props.stockData.filter(x => x.Product.includes(this.state.input))
              .map(function (name, index) {
                return (<tr>
                  <th scope="row">
                    {index + 1}
                  </th>
                  <td>
                    {name.Product}
                  </td>
                  <td>
                    {name.Available}
                  </td>
                  <td>
                    {name.Category}
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
    );
  }

  componentDidMount() {
    this.props.fetchDashboardStatisticsData();
   
    this.setState({
      ListOfItem: this.props.stockData
    })
  };



}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);