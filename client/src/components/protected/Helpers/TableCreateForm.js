import React from "react";
import { Redirect, Link } from "react-router-dom";

class TableCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      input: { value: "", isError: false, errorMsg: "" },
      isComplete: false,
      redirectTo: this.props.redirectTo,
      header: this.props.header,
    };
  }

  onInputChange = (e) => {
    const { data } = this.state;
    let input = this.state.input;
    input.isError = false;
    input.value = e.target.value;
    if (
      data
        .map((item) => item.name.toLowerCase())
        .includes(e.target.value.toLowerCase())
    ) {
      input.isError = true;
      input.errorMsg = "Такі дані вже є в системі";
    }
    this.setState({
      ...this.state,
      input,
    });
  };

  renderError = (msg, isError) => {
    if (isError) {
      return (
        <div className="form-group row">
          <div className="col-md-6 offset-md-4">
            <span className="text-danger">{msg}</span>
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  redirect = () => {
    const { isComplete, redirectTo } = this.state;
    if (isComplete) {
      return <Redirect to={redirectTo} />;
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.input.isError) {
      this.props.addObject({ name: this.state.input.value });
      this.setState({
        ...this.state,
        isComplete: true,
      });
    }
  };

  render() {
    const { input, redirectTo, header } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">{header}</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="name"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Назва
                    </label>

                    <div className="col-md-6">
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        value={input.name}
                        onChange={this.onInputChange}
                        required
                        autoComplete="name"
                        autoFocus
                      />
                    </div>
                  </div>
                  {this.renderError(input.errorMsg, input.isError)}
                  <div className="form-group row mb-0">
                    <div className="col-md-6 offset-md-4">
                      <button type="submit" className="btn btn-primary mr-2">
                        Підтвердити
                      </button>
                      <Link
                        to={redirectTo}
                        className="btn btn-danger"
                        role="button"
                      >
                        Відмінити
                      </Link>
                    </div>
                  </div>
                  {this.redirect()}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableCreateForm;
