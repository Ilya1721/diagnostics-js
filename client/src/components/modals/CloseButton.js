import React from "react";

class ClosButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { func, args } = this.props;

    return (
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={(e) => func(...args)}
      >
        <img
          src="https://diagnostics-bucket.s3.eu-central-1.amazonaws.com/logos/close.png"
          alt="close"
        />
      </button>
    );
  }
}

export default ClosButton;
