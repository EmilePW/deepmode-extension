import React from "react";
import PopupHeaderContainer from "../containers/PopupHeaderContainer";
import AuthContainer from "../containers/AuthContainer";
import SetTaskContainer from "../containers/SetTaskContainer";
import OnTaskContainer from "../containers/OnTaskContainer";

class Popup extends React.Component {
  componentDidMount() {
    const { taskDescription, updateRoute } = this.props;
    if (taskDescription)
      return updateRoute("/task");
  }

  render() {
    const { route, protagonist } = this.props;
    let result = null;
    if (!protagonist)
      result = <AuthContainer />;
    else if (route === "/")
      result = <SetTaskContainer />;
    else if (route === "/task")
      result = <OnTaskContainer />;

    return (
      <div className="Popup">
        <PopupHeaderContainer />
        {result}
      </div>
    );
  }
}

export default Popup;
