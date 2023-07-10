import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { isArray, isEmpty } from 'lodash';
import axios from '../../_config/axios';
import PredictionCard from '../../components/current-prediction-card/CurrentPredictionCard';
import NewPredictionCard from '../../components/current-prediction-card/NewCurrentPredictionCard';
import UpcomingMatchCard from '../../components/upcoming-matchlist/UpcomingMatchList';
import { Link } from 'react-router-dom';
import NewSubscriberModal from './NewSubscriberModal';
import Spinner from '../../components/loders/loder-spinner';
import {RewardDetailsSimmer} from '../../simmer-loader/index';

import '../../assets/css/how-to-play.css';
const params = {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    slidesPerView: 1,
    spaceBetween: 10,
};

const Prediction = (props) => {
    //console.log(props)
    const [predictions, setPredictions] = React.useState([]);
    const [currentDate, setCurrentDate] = React.useState([]);
    const [winPoint, setwinPoint] = React.useState([]);
    const [userDetails, setUserDetails] = React.useState([]);
    const [checkboxForPopup, setCheckboxForPopup] = React.useState('');
    const [isLoading,SetIsLoading] = React.useState(false)




    React.useEffect(() => {
       

        setUserDetails(JSON.parse(localStorage.getItem('userDetailsforPopup')))

    }, []);

    return (

        <React.Fragment>
            {userDetails && userDetails.login_count >= 0 && userDetails.checkboxstatus == 0 &&
               <NewSubscriberModal />
            }
            {/*console.log(props.isLoading)*/}
        { props.isLoading && <RewardDetailsSimmer/> }
            {props.predictions.map((prediction, key) => (
             <NewPredictionCard key={key} {...prediction} winPoint={winPoint} currentDate={props.currentDate} isLoading={isLoading}/>
            ))}
            {props.matchList ?.map((match, key) => (
             <UpcomingMatchCard key={key} {...match} winPoint={winPoint} currentDate={props.currentDate} isLoading={isLoading} />
            ))}
            
            
        </React.Fragment>
    )
}

export default Prediction; 

