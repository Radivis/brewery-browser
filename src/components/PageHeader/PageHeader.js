import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import './PageHeader.css'

const PageHeader = ({title, isHome = false}) => {
    const navigate = useNavigate()

return <div className="page-header">
    {!isHome && (
        <>
        <button className="transparent header-link" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-angle-left"></i>
            </button>
        <Link to="/"><i className="fa-solid fa-house header-link"></i></Link>
        </>
    )}
    <h2 className="page-title">{title}</h2>
</div>
}

export default PageHeader