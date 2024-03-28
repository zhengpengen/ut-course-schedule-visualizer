import { Link } from 'react-router-dom';

const BackButton = () => {
    return(
        <div>
            <Link to='/'>
                <button>
                Go Back To Course Set Up
                </button>
            </Link>
        </div>
    )
}

export default BackButton;