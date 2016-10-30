import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';

class PaySmartDepositModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { isValid: true, isSuccess: false };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputField = this.handleInputField.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleSubmit() {
        if (!this.state.password) {
            this.setState({ isValid: false });
        } else {
            this.props.handleSubmit(
                this.state.password,
                () => this.setState({ isSuccess: true })
            );
        }
    }

    handleInputField(event) {
        this.setState({ password: event.target.value, isValid: true });
    }

    handleClose() {
        this.props.changePoolState('init');
        this.props.handleClose();
    }

    render() {
        const { show, handleClose, labelSubmit, title, hash } = this.props;
        const { isValid, isSuccess } = this.state;
        return (
            <Modal
                show={show}
                onHide={handleClose}
                container={this}
            >
                <div className="panel-modal">
                    {!isSuccess ?
                    <div>
                        <div className="panel-body form text-center">
                            <h5>{title}</h5>
                            <input
                                autoFocus
                                className="field"
                                placeholder="Please enter your Password"
                                type="password"
                                onChange={this.handleInputField}
                            />
                            {!isValid ? <p className="error">Required</p> : null}
                        </div>
                        <div className="panel-control text-center">
                            <button onClick={this.handleSubmit} className="btn btn-center">Pay</button>
                        </div>
                    </div>:
                    <div>
                        <div className="panel-body form">
                            <h5>{`TX Hash: ${hash}`}</h5>
                            <h5>
                                Send succeeded.Please wait for the transaction to be proceeded by us.
                                It will take about 1-2 minutes
                            </h5>
                        </div>
                        <div className="panel-control text-center">
                            <button onClick={this.handleClose} className="btn btn-center">Ok</button>
                        </div>
                    </div>
                    }
                </div>
            </Modal>
        );
    }
}

PaySmartDepositModalComponent.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    changePoolState: PropTypes.func.isRequired,
    title: PropTypes.string,
    hash: PropTypes.string
};

export default PaySmartDepositModalComponent;
