import React, { Component } from 'react'

import VideoPlayer from './VideoPlayer/VideoPlayer.js'
import Regform  from './Regform/Regform'
import FirstTitle  from './FirstTitle/FirstTitle'
import SecondTitle from './SecondTitle/SecondTitle'

import video from './lp-en.mp4'
import video2 from './members-en.mp4'

import ModalForm from "./Regform/ModalForm";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";


export default class TopSection extends Component {
    state = {
        showModal: false
    };

    onHide = () => this.setState({ showModal: false });
    handleShow = () => this.setState({ showModal: true });

    render() {
        let languageManager = this.props.languageManager(),
        path = this.props.location.pathname

        return (
            <div className='TopSection'>
                {(path === '/') ?
                <Modal show={this.state.showModal} onHide={this.onHide}>
                    <ModalForm validateParams={this.props.validateParams} form={this.props.form} pageHandler={this.props.pageHandler} countryCode={this.props.countryCode} languageManager={this.props.languageManager} handleStep={this.props.handleStep} handleForward={this.props.handleForward} handleSubmit={this.props.handleSubmit} step={this.props.step} location={this.props.location}/>
                    <button className="btn-close" onClick={this.onHide}>{languageManager.close_btn}</button>
                </Modal> :
                ''}
               {(path === '/') ? <FirstTitle languageManager={languageManager} /> : <SecondTitle languageManager={languageManager} />}
                
                <div className="top-reg" id="top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-7 col-sm-12">
                                <VideoPlayer trackVideoPlay={this.props.trackVideoPlay} link={((path === '/') ? video : video2)} />
                            </div>
                            <div className="col-lg-4 col-md-5 col-sm-12">
                                <div className="regform">
                                    <Regform {...this.props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fixed-block" onClick={this.handleShow}>
                    <div className="numbers">
                        <Carousel pauseOnHover={false} wrap={false} indicators={false} controls={false}>
                            <Carousel.Item>
                                <p>5</p>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p>4</p>
                            </Carousel.Item>
                            <Carousel.Item>
                                <p>2</p>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="text-description">
                        <p>{languageManager.fixed_block}</p>
                    </div>
                </div>
            </div>
        )
    }
}
