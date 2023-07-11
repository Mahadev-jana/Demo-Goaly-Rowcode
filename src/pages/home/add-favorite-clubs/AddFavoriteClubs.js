import React,{useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
// import 'rc-collapse/assets/index.css';
import { isArray } from 'lodash';
import Collapse, { Panel } from 'rc-collapse';
import { ContestAllSimmer } from '../../../simmer-loader/index';
import Skeleton from 'react-loading-skeleton';
import axios from '../../../_config/axios';
import FavoriteClubModal from './FavoriteClubModal';
import DeleteFavoriteClubModal from './DeleteFavouriteClubsModal';

import { isAuthenticate } from '../../../_helper/authentication';
import { Row, Col, Image } from 'react-bootstrap';
import imgAddClub from '../../../assets/img/tm-add.png';
import Modal from 'react-responsive-modal';
import imgDeleteClub from '../../../assets/img/tm-delete.png';
import addButton from '../../../assetsStaging/img/ic-green add-circle.png';
import minusButton from '../../../assetsStaging/img/ic-purple-minus.png';
import favoriteClubImage from '../../../assetsStaging/img/user_club_fake.png';
import goalyLogo from '../../../../src/assets/img/logo-goaly.png';
import './addFavoriteTeams.css';



function expandIcon({ isActive }) {
    return (
        <i style={{ marginRight: '1rem', position: 'absolute', right: '0px', fontSize: '24px', color: '#337ab7' }}>
            {isActive ? `-` : `+`}
        </i>
    );
}

const AddFavoriteClub = () => {
    const isLoggedIn = isAuthenticate();
    if (isLoggedIn)
        return <AddFavoriteClubWithLogin />
    return <AddFavoriteClubWithOutLogin />
};

export default AddFavoriteClub;

const AddFavoriteClubWithLogin = React.memo(withRouter(({ history }) => {
    const [show, setShow] = React.useState(false);
    const [clubs, setClubs] = React.useState([]);
    const [openAddModal, setOpenAddModal] = React.useState(false);
    const [openDeleteModal, setDeleteModal] = React.useState(false);
    const [expandClubs, setExpandClubs] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        setIsLoading(true)
        getClub();
    }, []);

    useEffect(()=>{
        console.log(expandClubs)
    })
    //test
    const getClub = () => {
        const payload = new FormData();
        // console.log(payload)
        const userdetails = JSON.parse(localStorage.getItem('userDetails'));
        // payload.append('user_id', (userdetails.id));
        payload.append('user_id', userdetails.id);
        axios({
            method: 'post',
            url: 'api/favteam',

            headers: {
                'JWT': localStorage.getItem('JWT'),
            },
            data: payload
        }).then(res => {
            //console.log(res)
            if (res.data && res.data.success && res.data.success == 1) {
                if (res.data.favteams && isArray(res.data.favteams)) {
                    setClubs(res.data.favteams);

                }
                setIsLoading(false);
            }
        }).catch(err => {
            console.log({ err })
        })
    }

    // const openModal = () => {
    //     getClub();
    //     setModal(true);
    // }

    const closeModalSave = () => {
        getClub();
        setOpenAddModal(false);
        setDeleteModal(false);

    }
    const closeModal = () => {
        setOpenAddModal(false);
        setDeleteModal(false);

    }
    const showAllClubs = () => {
        //console.log('open')
        setExpandClubs(true)
    }
    const showThreeClubs = () => {
        //console.log('close');
        setExpandClubs(false)
    }

    const closeExpandClubs = () => {
        setExpandClubs(false);
    }

    const customStyles = {
        content: {
            top: '70%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (

        <>
            {isLoading && <Skeleton count={3} />}
            <Modal open={openAddModal} onClose={() => closeModal()} center styles={{
                modal: {
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    overflow: 'auto'

                }
            }}>
                {<FavoriteClubModal closeModal={() => closeModal()} closeModalSave={() => closeModalSave()} />}
            </Modal>

            <Modal open={openDeleteModal} onClose={() => closeModal()} center styles={{
                modal: {
                    height: '100%',
                    width: '100%',
                    padding: 0,
                    overflow: 'scroll'
                }
            }}>
                {<DeleteFavoriteClubModal closeModalSave={() => closeModalSave()} />}
            </Modal>
            {!expandClubs && !isLoading &&
                <div className="block">
                    <div className="my-team bg-white border radius-1 row">
                        <span><strong>Favorite Club</strong></span>
                        <ul onClick={showAllClubs}>
                            {clubs.slice(0, 3).map((club, key) => (
                                <li style={{ marginLeft: "-10px" }} key={key} ><img src={club.badge} alt="" /></li>
                            ))}
                        </ul>
                        {/* <a onClick={showAllClubs}><img src={addButton} alt="" /></a> */}
                        <a onClick={() => setOpenAddModal(true)} className='add-club-button'>+</a>
                    </div>
                </div>}

            {/* new design */}

            <Modal open={expandClubs}
                onClose={closeExpandClubs}
                style={customStyles}>
                <div className="block">

                    <div className="my-team bg-white border radius-1 row" style={{ display: "block",marginTop: '0px', border: 'none' }}>
                        {/* <p style={{ float: "right", fontSize: "21px", fontWeight: "bolder" }} onClick={showThreeClubs}>x</p> */}
                        <div style={{ textAlign: 'center', padding: 10 }}>
                            <img src={goalyLogo} alt="goalyloopenAddModalgo" style={{ height: 50, width: 'auto' }} />
                            {/* <button onClick={showThreeClubs} className="styles_closeButton__20ID4" style={{ top: '173px', right: '33px' }}><svg class="styles_closeIcon__1QwbI" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 36 36"><path d="M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z"></path></svg></button> */}
                        </div>

                        {/* <div className='newAddClub'>
                            <img onClick={() => setOpenAddModal(true)} style={{ height: '52px', marginBottom: "16px", width: "52px" }} src={imgAddClub} alt="" />
                        </div> */}
                        <div>
                            <div style={{ fontWeight: 700, fontSize: 15, margin: '0px 0px 10px 12px', textAlign: 'center' }}> Your Favourite Clubs</div>

                            {/* <a onClick={() => setOpenAddModal(true)}><img style={{ height: '50px', margin: '9px' }} src={imgAddClub} alt="" /></a> */}
                            {/* <a onClick={showThreeClubs}><img style={{ height: '50px', margin: '9px' }} src={minusButton} alt="" /></a> */}

                            <div className="clearfix" style={{ clear: 'both' }}></div>
                        </div>

                        {clubs.map((club, key) => (
                            <div key={key} xs={3} className="ad-club-modal-club">
                                <div className="ad-club-modal-club-img">
                                    <img src={club.badge} style={{ height: '40px', width: '40px' }} />
                                </div>
                                <div className="ad-club-modal-club-name" >
                                    <h4 className=""
                                        style={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%'
                                        }}
                                    >{club.name}</h4>
                                </div>
                                <div className="ad-club-modal-club-icons">
                                    <a onClick={() => history.push(`/club-info/${club.id}`)} style={{ padding:'12px 6px 6px 6px'}}>
                                        <i class="fa fa-external-link" aria-hidden="true" style={{ fontSize: '20px', color: '#0099cc' }}> </i>
                                    </a>
                                    {/* <a onClick={() => setDeleteModal(true)}>
                               <i onClick={() => setDeleteModal(true)} className="fa fa-trash" style={{ fontSize: '20px', color: 'red' }}></i>
                           </a> */}
                                    <a onClick={() => setDeleteModal(true)}><i onClick={() => setDeleteModal(true)} className="fa fa-trash" style={{ fontSize: '20px', color: 'red', padding:'6px' }}></i></a>
                                </div>
                               
                                <div className="clearfix" style={{ clear: 'both' }}></div>
                            </div>
                        ))}



                    </div>


                </div>
            </Modal>




            {/* <Modal open={open} onClose={() => closeModal()} center styles={{
            modal: {
                height: '100%',
                width: '100%',
                padding: 0,
                overflow: 'auto'

            }
        }}>
            {<FavoriteClubModal closeModal={() => closeModal()} />}
        </Modal>

        <Modal open={openDeleteModal} onClose={() => closeModal()} center styles={{
            modal: {
                height: '100%',
                width: '100%',
                padding: 0,
                overflow: 'hidden'
            }
        }}>
            {<DeleteFavoriteClubModal closeModal={() => closeModal()} />}
        </Modal>
        <Row>
            <Col xs={12} className="pd-0 mb-10" >
                <Collapse accordion={true} expandIcon={expandIcon}>
                    <Panel header={
                        <><div className="col-md-8" style={{ paddingRight: 7, paddingLeft: 6 }}>MyTeam</div>
                            <div className="col-md-4 padding-left" style={{ width: '100%' }}>
                                {clubs.slice(0, 5).map((club, key) => (
                                    <div style={{ float: 'right', paddingRight: 5, paddingLeft: 5 }}> <Image src={club.badge} responsive style={{ height: 28, width: 28 }} /> </div>
                                ))}
                            </div>
                        </>
                    } headerClass="my-header-class">
                        <Row>
                            {clubs.map((club, key) => (
                                <Col key={key} xs={3} onClick={() => history.push(`team/${club.id}`)}>
                                    <div className="pd-5">
                                        <Image src={club.badge} responsive style={{ height: 50, width: 50 }} />
                                    </div>
                                    <div className="clearfix" style={{ clear: 'both' }}></div>
                                </Col>
                            ))}
                            <Col xs={6} >
                                <div className="pd-5" >
                                    <Image onClick={() => setModal(true)} src={imgAddClub} responsive style={{ height: 50, width: 50 }} />
                                    <Image src={imgDeleteClub} onClick={() => setDeleteModal(true)} responsive style={{ height: 50, width: 50, marginLeft: '27%' }} />
                                    <div className="clearfix" style={{ clear: 'both' }}>
                                    </div>
                                </div>
                            </Col>
                            <div className="clearfix" style={{ clear: 'both' }}></div>
                        </Row>
                    </Panel>
                </Collapse>
            </Col>
        </Row> */}
        </>
    )
}));

const AddFavoriteClubWithOutLogin = React.memo(withRouter(({ history }) => {
    const onClickLogin = () => {
        Swal.fire({
            type: 'info',
            title: 'Login first to add your favorite clubs!!',
            confirmButtonText: 'login',
        }).then(result => {
            if (result.value) {
                history.push('/login');
            }
        });
    }
    return (
        <div class="block">
            <div class="my-team bg-white border radius-1 row">
                <span><strong>Favorite Club</strong></span>
                <img src={favoriteClubImage} style={{ width: '55%', paddingTop: '5px' }} alt="" />

                <a onClick={onClickLogin}><img src={addButton} alt="" /></a>
            </div>
        </div>
        // <Row>
        //     <Col xs={12} className="pd-0 mb-10" onClick={onClick}>
        //         <Collapse accordion={true} expandIcon={expandIcon}>
        //             <Panel header="MyTeam" headerClass="my-header-class" disabled></Panel>
        //         </Collapse>
        //     </Col>
        // </Row>
    )
}));