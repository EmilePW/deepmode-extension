import React from "react";
import { Link } from "react-router-dom";
import IoIosArrowThinRight from "react-icons/lib/io/ios-arrow-thin-right"

class SetTask extends React.Component {
  constructor(props) {
    super(props);
    this.taskInputRef = React.createRef();
    this.setTask = this.setTask.bind(this);
    this.returnToRecentTask = this.returnToRecentTask.bind(this);
  }

  setTask(taskDescription) {
    if (taskDescription.length > 0)
      return this.props.setTask(taskDescription);
  }

  returnToRecentTask(description, categories) {
    const { updateTaskDescription, updateTaskCategories, updateRoute, addRecentTask } = this.props;
    updateTaskDescription(description);
    updateTaskCategories(categories);
    updateRoute("/task");
    addRecentTask({ description, categories });
  }

  render() {
    let { recentTasks, currentTask } = this.props;
    recentTasks = recentTasks ?
      recentTasks.map((task, i) =>
        <li
          key={i}
          className="previous-task"
          onClick={(e) => this.returnToRecentTask(task.description, task.categories)}
        >
          <span>{task.description}</span>
          <IoIosArrowThinRight size={30} />
        </li>
      ) : null;
    return (
      <div className="SetTask">
        <div className="new-task">
          <h6>What are you working on?</h6>
          <input
            ref={this.taskInputRef}
            defaultValue={currentTask}
            className="form-input"
            type="text"
            name="task"
            placeholder="Brief task description" />
          <button className="btn" onClick={(e) => this.setTask(this.taskInputRef.current.value)}>
            Set Task
          </button>
        </div>
        <div className="divider"></div>
        <div className={recentTasks.length ? "previous-tasks" : "d-none"}>
          <h6>Return to a previous task</h6>
          <ul>
            {recentTasks}
          </ul>
        </div>
      </div>
    );
  }
}

export default SetTask;
