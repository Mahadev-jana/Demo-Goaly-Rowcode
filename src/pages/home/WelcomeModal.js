import React, { useState, useEffect } from 'react'
import "./style.css";
import data from "./data";





const WelcomeModal = () => {
  const [people] = useState(data);
  const [current, setCurrent] = useState(0);
  const [popupFade, SetPopUpFade] = useState(false);
  const [modalShow,setModalShow] = useState(true)




  const length = people.length;


  function nextSlide() {
    setCurrent(current + 1);
  }

  function closeModal() {
    SetPopUpFade(true);
    setTimeout(()=>setModalShow(false),1000)

  }
//   closeModal = () => {
//     console.log("popupfade is " + popupFade)
//     this.setState({ popupFade : true });
    
//     setTimeout(()=>{
//         this.setState({ statusmodel: false })
//     },150)
// }







  return (
    <>
      {modalShow && <div className={`modal fade ${popupFade ? "" : "in"}`} tabindex="-1" role="dialog" id="howToPlay" style={{ display: "block", marginTop: "64px",backgroundColor: "rgba(0,0,0,0.9)" }}>
        <div class="modal-dialog modal-sm" role="document" >
          <div class="modal-content intro" style={{ width: "91%" }} >
            <div class="modal-body p-0" >
              <div class="intro-wrapper">
                <div class="intro-slider" >
                  {people.map((item, index) => {
                    const { id, image, logo, title, quote } = item;
                    if (current === index) {
                      return (
                        <div>
                          <div class="intro-slider-item" key={id}>
                            <div class="px-2 pt-2" >
                              <div className="text-center">

                                <img src={logo} height="35" alt="Logo" style={{ margin: "0 auto" }} />
                              </div>
                              <img class="img-responsive" src={image} alt="Intro" />
                            </div>
                            <div class="intro-info"style={{borderRadius:"6px"}} >
                              <div class="container-fluid">
                                <ul class="intro-dots">
                                  {Array.from({ length: 4 }).map((item, index) => (

                                    <li className={current === index ? "active" : ""} ><span className='dots' ></span></li>
                                  ))}
                                </ul>

                                <div class="intro-desc">
                                  <h4 className="intro-title">{title}</h4>
                                  <p className="mb-0">{quote}</p>
                                </div>
                                {index === 3 ?


                                  <a onClick={closeModal} class="btn text-uppercase btn-block btn-default" data-dismiss="modal" aria-label="Close">Finish</a>
                                  :
                                  <div class="row" >
                                    <div class="col-xs-6" >
                                      <a onClick={nextSlide} class="btn text-uppercase btn-block btn-purple next-slide">Next</a>
                                    </div>
                                    <div class="col-xs-6">
                                      <a onClick={closeModal} class="btn text-uppercase btn-block btn-default" data-dismiss="modal" aria-hidden="true">Skip</a>
                                    </div>
                                  </div>
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                      )
                    }
                  })}
                </div>
              </div>
            </div>
          </div >
        </div >
      </div>}
    </>
  )
}

export default WelcomeModal