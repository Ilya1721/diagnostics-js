import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCreateData } from "../../actions/visit/visitActions";
import moment from "moment";

class VisitsCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastName: "",
      firstName: "",
      fatherName: "",
      room: "",
      startDate: moment(),
      endDate: moment(),
      city: "",
      street: "",
      house: "",
      flat: "",
      phoneNumber: "",
    };
  }

  componentDidMount() {
    this.props.getCreateData();
  }

  render() {
    return <div className="hh">dede</div>;
  }
}

VisitsCreateForm.propTypes = {
  city: PropTypes.object.isRequired,
  getCities: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  getRooms: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  createData: state.createData,
});

export default connect(mapStateToProps, { getCreateData })(VisitsCreateForm);
