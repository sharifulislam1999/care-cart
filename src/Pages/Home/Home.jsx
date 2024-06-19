import CategorySeciton from '../../Components/CategorySection/CategorySeciton';
import CategoryTitle from '../../Components/CategoryTitle/CategoryTitle';
import Contact from '../../Components/Contact/Contact/Contact';
import DiscountSlider from '../../Components/DiscountSlider/DiscountSlider';
import JoinNow from '../../Components/JoinNow/JoinNow';
import Slider from '../../Components/Slider/Slider';
import { Helmet } from 'react-helmet';
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || CareCart</title>
            </Helmet>
            <Slider></Slider>
            <div className='container mx-auto px-3'>
                <div>
                    <CategoryTitle title={'Feature Category'} des={"CareCart Pain Relief Tablets provide fast, long-lasting relief from headaches, muscle aches, arthritis, toothaches, and menstrual cramps. Easy-to-swallow, non-drowsy formula trusted by doctors for effective pain management"}></CategoryTitle>
                </div>
                <div>
                    <CategorySeciton ></CategorySeciton>
                </div>
                <div>
                    <CategoryTitle title={'Discounted Medicine'} des={"CareCart Pain Relief Tablets offer quick, lasting relief from headaches, muscle aches, arthritis, toothaches, and menstrual cramps. Non-drowsy, easy-to-swallow, and now available at a discounted price"}></CategoryTitle>
                </div>
                <div>
                    <DiscountSlider></DiscountSlider>
                </div>
                <div>
                    <CategoryTitle title={'Join Now'} des={"Join our seller community and get your products featured like XYZ Pain Relief Tablets. Enjoy exclusive discounts, marketing support, and increased visibility. Boost your sales and grow your business with us today!"}></CategoryTitle>
                </div>
                <div>
                    <JoinNow></JoinNow>
                </div>
                <div>
                    <CategoryTitle title={'Get In Touch'} des={"Get in touch with us to learn more about featuring your products like XYZ Pain Relief Tablets. Enjoy special discounts, dedicated support, and increased exposure. Connect with us today to boost your sales!"} ></CategoryTitle>
                </div>
                <div>
                   <Contact/>
                </div>
            </div>
        </div>
    );
};

export default Home;