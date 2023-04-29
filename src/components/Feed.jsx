import React from "react";

const Feed = () => {
    return (
        <div id="feed" className="feed-container container-fluid">
            <div className="feed-intro d-flex align-items-center flex-column">
                <h2 className="pt-5">Alle huidige meetings</h2>
                <p className="m-0">Hieronder vind je alle meetings die ingepland staan</p>
                <p className="m-0">klik op de meeting voor meer informatie.</p>
            </div>
            <div className="row pt-5">  
                <div className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                    <h1>Meeting</h1>
                </div>
                <div className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                    <h1>Meeting</h1>
                </div>
                <div className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                    <h1>Meeting</h1>
                </div>
                <div className="feed-container_item col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 text-center">
                    <h1>Meeting</h1>
                </div>
            </div>
        </div>
    );
}

export default Feed;