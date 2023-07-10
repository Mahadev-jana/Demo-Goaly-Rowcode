import React from 'react'
import stadiumImg from '../../assetsStaging/img/stadium-alt.jpg';
import { Row, Col } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Modal from 'react-responsive-modal';
import { isNull } from 'lodash';
import { getUserDetails } from '../../_helper/authentication';
import UserPlayContest from '../../pages/matches/UserPlayContest';
import Swal from 'sweetalert2';
import Spinner from '../../components/loders/loder-spinner';
import '../current-prediction-card/CurrentPrediction.css';
import * as moment from 'moment';
import Countdown from 'react-countdown';
import { BASE_URL } from '../../_config/axios'


const UpcomingMatchList = (props) => {
    const url = `${BASE_URL}${props.league}`;
    return (
        <>
            {!props.isLoading &&

                <div class="timeline-group">
                    <div class="timeline-group-header header-match clearfix">
                        <span class="float-left">
                            <span class="icon-ball mr-1"></span> <strong>Match</strong>
                        </span>
                        <span class="timeline-label">Upcoming Match</span>
                    </div>
                    <div class="match-area">
                        <div class="row small mb-1">
                            <div class="col-xs-6">
                                <p class="m-0 text-left">
                                    <Link
                                        to={{
                                            pathname: `/league/${props.league}`,
                                            state: { leagueId: props.league, compId: props.competition_id }
                                        }}>
                                         
                                         <span style={{color:"white"}}>{props.league}</span>
                                       
                                    </Link>
                                   
                                </p>
                            </div>
                            <div class="col-xs-6">
                                <p class="m-0 text-right">
                                    <span><Moment format="ddd, DD/MM/YY">{props.date}</Moment></span>
                                </p>
                            </div>
                        </div>
                        <div class="row d-flex ais-center mb-1">
                            <div class="col-xs-5">
                                <div class="club-box club-l">
                                    <div class="club-pict">
                                        <span class="team-img" onClick={() => props.history.push(`/club-info/${props.hometeamlogo}`)}><img src={props.hometeamlogo} alt="Team" /></span>
                                    </div>
                                    <div class="club-name">{props.home_team_short_code}</div>
                                </div>
                            </div>
                            <div class="col-xs-2 text-center">VS</div>
                            <div class="col-xs-5">
                                <div class="club-box club-r">
                                    <div class="club-name">{props.away_team_short_code}</div>
                                    <div class="club-pict">
                                        <span class="team-img" onClick={() => props.history.push(`/club-info/${props.awayteamlogo}`)}><img src={props.awayteamlogo} alt="Team" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default withRouter(UpcomingMatchList)

const utcToLocal = dateTime => {
    const stillUtc = moment.utc(dateTime).toDate();
    return moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');
}

const styles = {

    title: {
        background: stadiumImg
    }
}