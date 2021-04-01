import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class HomeLayout extends React.Component {
  render() {
    const { Child } = this.props;
    const { user } = this.props.auth;
    return (
      <div className="row mx-4">
        <div className="col-2 text-left">
          <hr />
          <h5 className="mt-3" style={{ fontSize: "1.1rem" }}>
            Ви увійшли як {user.job}
          </h5>
          <hr />
          <h4>
            {user.lastName} {user.firstName} {user.fatherName}
          </h4>
        </div>
        <div className="col-8 mt-3 ml-4">
          <main className="py-4">
            <Child />
          </main>
        </div>
        <div className="col-2"></div>
      </div>
    );
  }
}

HomeLayout.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(HomeLayout);
