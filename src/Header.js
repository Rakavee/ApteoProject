import React, { PureComponent } from "react";
import "./Header.css";

export default class Header extends PureComponent {
  render(props) {
    return (
      <div>
      <header className="component-header">
        Weather App
      </header>
      <h3>Select a city below to know the current weather information!</h3>
      </div>
    );
  }
}
