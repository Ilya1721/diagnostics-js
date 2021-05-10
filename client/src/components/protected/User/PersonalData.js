import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../modals/Loading";
import { addLink } from "../../../actions/navigation/navigationActions";

class PersonalData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.auth.loading,
    };
  }

  componentDidMount() {
    this.props.addLink({
      path: window.location.pathname,
      name: "Особисті дані",
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.auth.loading !== this.props.auth.loading) {
      this.setState({
        loading: this.props.auth.loading,
      });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      const {
        job,
        jobId,
        city,
        cityId,
        department,
        departmentId,
        room,
        roomId,
        about,
        lastName,
        firstName,
        fatherName,
        street,
        house,
        flat,
        phoneNumber,
        image,
        id,
      } = this.props.auth.user;

      return (
        <div className="card">
          <div className="card-header">Особиста інформація</div>
          <div className="row mt-2 ml-2">
            <div className="col text-center">
              <span className="font-weight-bold pr-1">Фото:</span>{" "}
              <img src={image} className="default-image" />
              <p className="pt-1">
                <span className="font-weight-bold">ПІБ:</span> {lastName}{" "}
                {firstName} {fatherName}
              </p>
            </div>
            <div className="col">
              <span className="font-weight-bold">Про себе:</span> {about}
            </div>
          </div>
          <div className="row mt-2 ml-2">
            <div className="col">
              <div className="card-text">
                <span className="font-weight-bold">Адреса: </span>
                м.{city} вул.{street} {house} кв.{flat}
              </div>
            </div>
            <div className="col">
              <div className="card-text">
                <span className="font-weight-bold">Номер телефону: </span>
                {phoneNumber}
              </div>
            </div>
          </div>
          <div className="row mt-2 ml-2">
            <div className="col">
              <div className="card-text">
                <span className="font-weight-bold">Посада: </span>
                {job}
              </div>
            </div>
            <div className="col">
              <div className="card-text">
                <span className="font-weight-bold">Відділ: </span>
                {department}
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col text-center">
              <Link
                className="btn btn-primary my-3"
                role="button"
                to={`/users/${id}/edit`}
              >
                Редагувати
              </Link>
            </div>
          </div>
        </div>
      );
    }
  }
}

PersonalData.propTypes = {
  addLink: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLink })(PersonalData);
