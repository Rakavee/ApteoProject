import React, { PureComponent } from "react";
import Header from "./Header";
import Weather from "./Weather";


export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Weather /> 
      </div>
    );
  }
}
