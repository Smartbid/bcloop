import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { thisTypeAnnotation } from '@babel/types';

export default class BottomSection extends Component {
    render() {
        let languageManager = this.props.languageManager();

        return (
            <div className='BottomSection'>
                <div className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="links">
                                    <Link to={{pathname: '/', search: this.props.location.search}}>Home</Link>
                                    <Link to={{pathname: '/agreement', search: this.props.location.search}}>Website Agreement</Link>
                                    <Link to={{pathname: '/risk', search: this.props.location.search}}>Risk Disclaimer</Link>
                                    <Link to={{pathname: '/privacy', search: this.props.location.search}}>Privacy Policy</Link>
                                </div>
                                <div className="footer-description">
                                    <p>{languageManager.risk[0]}</p>
                                    <p>{languageManager.risk[1]}</p>
                                    <p>{languageManager.risk[2]}</p>
                                    <p>{languageManager.risk[3]}</p>
                                    <p>{languageManager.risk[4]}</p>
                                </div>
                                <div className="content">
                                    <div className="copyright"><p>© 2018 All Rights Reserved - Bitcoin LoopHole</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
