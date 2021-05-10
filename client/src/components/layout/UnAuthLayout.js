import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnAuthLayout extends React.Component {
  render() {
    const { Child } = this.props;
    return (
      <div className="row mx-4">
        <div className="col-2 text-left">
          <ul className="mt-5 left-nav-links">
            {this.props.navigation.links.map((link) => (
              <li key={link.path}>
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
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

UnAuthLayout.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  navigation: state.navigation,
});

export default connect(mapStateToProps, {})(UnAuthLayout);
