import './GroupingPage.css';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';

const GroupingPage = ({groupCards, setGroupCards, unassignedClasses, setUnassignedClass, allClasses, setAllClasses}) => {
    return(
        <DragAndDrop
            groupCards={groupCards}
            setGroupCards={setGroupCards}
            unassignedClasses={unassignedClasses}
            setUnassignedClass={setUnassignedClass}
            allClasses={allClasses}
            setAllClasses={setAllClasses}
        />
    );
}

export default GroupingPage;