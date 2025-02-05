import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';

import SimpleSlider from '../../componets/Header/Carousel';
import HowItWorks from './HowItWorks';
import SixPremiumMember from './SixPremiumMember';
import Success from './Success';
import SuccessStory from './SuccessStory';





const Home = () => {
    const eventData = useLoaderData()

    const authInfo = useContext(AuthContext)
    // console.log(authInfo);

    return (
        <div>
             <SimpleSlider/>
             <SixPremiumMember></SixPremiumMember>
             <HowItWorks></HowItWorks>
             <Success></Success>
             <SuccessStory></SuccessStory>
           <div className="py-10">
           </div>

    
           <div className="mt-12">
           </div>

        </div>
    );
};

export default Home;