import "./GroupingPage.css";
import DragAndDrop from "../../components/DragAndDrop/DragAndDrop";
import NavigationBar from "./NavigationBar";
const GroupingPage = ({
  groupCards,
  setGroupCards,

  unassignedClasses,
  setUnassignedClass,

  groupCounts,
  setGroupCounts,

  groupNames,
  setGroupNames,

  nextId,
  setNextId,

  allSchedules,
  setAllSchedules,
}) => {
  return (
    <>
      <NavigationBar />
      <DragAndDrop
        groupCards={groupCards}
        setGroupCards={setGroupCards}
        unassignedClasses={unassignedClasses}
        setUnassignedClass={setUnassignedClass}
        groupCounts={groupCounts}
        setGroupCounts={setGroupCounts}
        groupNames={groupNames}
        setGroupNames={setGroupNames}
        nextId={nextId}
        setNextId={setNextId}
        allSchedules={allSchedules}
        setAllSchedules={setAllSchedules}
      />
    </>
  );
};

export default GroupingPage;
