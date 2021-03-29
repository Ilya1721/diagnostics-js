import React from "react";

class Welcome extends React.Component {
  render() {
    return (
      <div className="container mt-3">
        <h1 className="text-center">
          Автоматизоване робоче місце терапевта поліклініки
        </h1>
        <div className="row mt-5">
          <div className="col">
            <h3>Допомога в діагностуванні</h3>
            <p className="mt-4">
              Отримуйте допомогу в діагностуванні від спеціальної системи
            </p>
          </div>
          <div className="col">
            <h3>Можливість обліку візитів</h3>
            <p className="mt-4">Реєструйте візити пацієнтів</p>
          </div>
          <div className="col">
            <h3>Доступ до бази даних хвороб</h3>
            <p>Продивляйтеся всі зареєстровані в системі хвороби</p>
          </div>
          <div className="col">
            <h3>Статистика візитів, хвороб та іншого</h3>
            <p>Аналізуйте статистику відвідувань</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col md-12 text-center">
            <h3>Сподобалась Система?</h3>
            <p>Економте свій час</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
