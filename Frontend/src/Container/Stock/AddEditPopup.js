import React, { Component } from 'react'

export default class AddEditPopup extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="modal fade" id="myModal" role="dialog" style={{display:"block"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                            <p>Some text in the modal.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
