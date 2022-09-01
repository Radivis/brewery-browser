/*
Just some minimal contact information
*/

import React from 'react';
import PageHeader from '../PageHeader/PageHeader';

const Contact = () => {
    return <div>
        <PageHeader title="Contact" />
        <p>App programmed by Michael Hrenka</p>
        <p>Github: <a href="https://github.com/Radivis">github.com/Radivis</a></p>
        <hr />
        <p>Data from API provided by <a href="https://www.openbrewerydb.org">Open Brewery DB</a></p>
    </div>
}

export default Contact