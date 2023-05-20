import React from "react"
import image from './images/project1.jpg'
import image2 from './images/project2.jpg'
import image3 from './images/project3.jpg'


const Carousel = () => {
    return (
        <>
            <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="10000">
                        <img src={image} className="d-block w-100" style={{width:"400px", height:'300px'}} alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src={image2} className="d-block w-100" style={{width:"400px", height:'300px'}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={image3} className="d-block w-100" style={{width:"400px", height:'300px'}} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
};

export default Carousel;
