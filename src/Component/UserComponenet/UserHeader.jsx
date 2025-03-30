import React from 'react';

const UserHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand d-flex align-items-center" href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/OLX_New_Logo.png" alt="OLX" style={{ height: '30px' }} />
            </a>
            <div className="ml-auto d-flex align-items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                <span>Pani Taki Chowk, Vadodara</span>
            </div>
            <div className="input-group ml-3" style={{ maxWidth: '300px' }}>
                <input type="text" className="form-control" placeholder='Search "Mobiles"' />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
            <div className="ml-3">
                <i className="far fa-heart"></i>
            </div>
        </nav>
    );
};

export default UserHeader;
