import './GroupingPage.css';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';

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
}) => {
    return(
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
        />
    );
}

export default GroupingPage;