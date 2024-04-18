import { Link } from "react-router-dom";
import "./BackButton.css";

const BackButton = () => {
  return (
    <div>
      <Link to="/ut-course-schedule-visualizer">
        <button className="return-btn">Return To Courses</button>
      </Link>
    </div>
  );
};

export default BackButton;
