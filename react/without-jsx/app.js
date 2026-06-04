import React from "https://esm.sh/react@19";
import { createRoot } from "https://esm.sh/react-dom@19/client";

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.text = props.text

    console.log(props);
  }

  render() {
    return React.createElement(
      "h1",
      null,
      this.text
    )
  }
}

class CustomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
    };

    this.toUpperCase = this.toUpperCase.bind(this);
  }

  toUpperCase() {
    this.setState(
      {
        text: this.state.text.toUpperCase(),
      },
    );
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        Component,
        this.state,
      ),
      React.createElement(
        "button",
        { onClick: this.toUpperCase },
        "To Upper Case",
      ),
    );
  }
}

const app = React.createElement(
  "div",
  null,
  React.createElement(CustomComponent, { text: "text" }),
);

const root = createRoot(document.getElementById("root"));
root.render(app);
