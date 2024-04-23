import BackButton from "../../components/BackButton/BackButton";
import "./HelpPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import exampleImage from "./example.png";
import addclasses from "./addclasses.png";

const HelpPage = () => {
  return (
    <>
      <div className="col-6 back-btn mt-3 mb-3">
        <BackButton />
      </div>
      <div className="help-title row">
        <h1>How to use UT CSV</h1>
      </div>
      <div className="directions-container">
        <ul>
          <li>
            Copy and paste the entire course schedule description into the
            textbox at the bottom of the UT CSV screen
          </li>
          <ul>
            <li>
              <img
                src={exampleImage}
                className="ex-img"
                alt="example of how to copy and paste"
              />
            </li>
            <li>
              Copy and paste from the course name all the way to the last course
              status (here it's the last "closed")
            </li>
          </ul>
          <li>
            The class card will automatically pop up into the Added Classes
            section
          </li>
          <li>
            Click on the down arrow of the class to check and uncheck
            sections/professors that you do not want to take
          </li>
          <li>
            Click the + sign on the right side to create a group of subjects for
            your classes. You're able to change the name of the group by simply
            clicking on "Group x" and typing in the new name.
          </li>
          <li>
            Drag and drop your classes into these groups. At the bottom of each
            group, input the number of classes you want from each group. UT CSV
            should look like this:
          </li>
          <ul>
            <li>
              <img
                src={addclasses}
                className="add-classes-img"
                alt="example of how to copy and paste"
              />
            </li>
            <li>
              Copy and paste from the course name all the way to the last course
              status (here it's the last "closed")
            </li>
          </ul>
          <li>
            Click Generate my schedule to view all the possible class
            combinations and use the filter at the top to easily find your
            desired schedule :D
          </li>
        </ul>
      </div>
    </>
  );
};

export default HelpPage;
