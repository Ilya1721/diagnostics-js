import React from "react";

class UserAccessDenied extends React.Component {
  render() {
    return (
      <div className="container text-center">
        У вас немає прав доступа для даної сторінки, на дану сторінку може
        заходити авторизований користувач
      </div>
    );
  }
}

export default UserAccessDenied;
