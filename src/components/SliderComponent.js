import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { dataSlider } from '../data';
import '../scss/SliderComponent.scss';


function SliderComponent() {

    // const [sliders, setSliders] = useState([]);
    // const [loading, setLoading] = useState(true);


    // useEffect(() => {
    //     try {
    //         axios.get('https://62dbdf9a4438813a260c4c1a.mockapi.io/pictures')
    //         then(data => setSliders(data))
    //     } catch (error) {
    //         alert('Ошибка при получении данных');
    //         console.error(error);
    //     }
    //     setLoading(false)
    // }, [])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };


    return (
        <div className='wrapper_slider'>
            <Slider {...settings}>
                {dataSlider.map((item) => (
                    <div key={item.id} className="slider">
                        <img className="slider_img" src={item.imageUrl} alt={item.title} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SliderComponent;