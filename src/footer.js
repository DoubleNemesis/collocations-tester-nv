import React from 'react';

function Footer(props) {
    const date = new Date();
    let year = date.getFullYear();

    return (
        <div>
            <div class="push">
            <hr/>
            <div className="footer">&#169; TomsClassroom.com {year}</div>
            </div>
        </div>
        
    )

}

export default Footer