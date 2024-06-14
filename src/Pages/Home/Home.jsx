import CategorySeciton from '../../Components/CategorySection/CategorySeciton';
import CategoryTitle from '../../Components/CategoryTitle/CategoryTitle';
import Contact from '../../Components/Contact/Contact/Contact';
import DiscountSlider from '../../Components/DiscountSlider/DiscountSlider';
import JoinNow from '../../Components/JoinNow/JoinNow';
import Slider from '../../Components/Slider/Slider';
const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <div className='container mx-auto px-3'>
                <div>
                    <CategoryTitle title={'Feature Category'}></CategoryTitle>
                </div>
                <div>
                    <CategorySeciton title={'Discounted Medicine'}></CategorySeciton>
                </div>
                <div>
                    <CategoryTitle title={'Discounted Medicine'}></CategoryTitle>
                </div>
                <div>
                    <DiscountSlider></DiscountSlider>
                </div>
                <div>
                    <CategoryTitle title={'Join Now'}></CategoryTitle>
                </div>
                <div>
                    <JoinNow></JoinNow>
                </div>
                <div>
                    <CategoryTitle title={'Get In Touch'}></CategoryTitle>
                </div>
                <div>
                   <Contact/>
                </div>
            </div>
        </div>
    );
};

export default Home;