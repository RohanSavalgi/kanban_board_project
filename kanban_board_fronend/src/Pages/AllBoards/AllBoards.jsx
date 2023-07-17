import React from "react";
import { useParams } from 'react-router-dom'

import './AllBoards.css';

const AllBoards = () => {

    const {user_id} = useParams();
    console.log(user_id);

    return(
        <React.Fragment>
            All boards!
            {/* {userId} */}
        </React.Fragment>
    )
}

export default AllBoards;
