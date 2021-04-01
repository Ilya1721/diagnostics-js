import React from "react";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        loading: this.props.loading,
      });
    }
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <img
          src="https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/logos/spinner.gif"
          alt="Loading..."
          className="spinner"
        />
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }
}

export default Spinner;
