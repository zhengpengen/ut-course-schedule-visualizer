import { Link } from "react-router-dom";

const BackButton = () => {
  return (
    <div>
      <Link to="/ut-course-schedule-visualizer">
        <button>Return To Course Set Up</button>
      </Link>
    </div>
  );
};

export default BackButton;
