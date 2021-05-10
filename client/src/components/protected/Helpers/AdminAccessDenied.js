import React from "react";

class AdminAccessDenied extends React.Component {
  render() {
    return (
      <div className="container text-center">
        У вас немає прав доступа для даної сторінки, на дану сторінку може
        заходити лише користувач з правами адміністратора
      </div>
    );
  }
}

export default AdminAccessDenied;
