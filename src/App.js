import React from 'react'
import ReactQueryParams from 'react-query-params'
import MainPage from './components/MainPage'
import {Route, Switch, withRouter} from 'react-router-dom'
import withQueryString from './components/withQueryString'

import Page from './pages/Page'
import * as Pages from './pages'

class App extends ReactQueryParams {

    render() {
        const pages = ['agreement', 'privacy', 'gov', 'risk']

        return (
            <div className='App'>
                <Switch>
                    <Route exact path="/" render={() =>
                        <MainPage {...this.props} handleStep={this.handleStep} step={this.props.step}/>
                    } />
                    <Route path="/members" render={() =>
                        <MainPage {...this.props}  handleStep={this.handleStep} step={this.props.step}/>
                    } />
                    {pages.map(page => 
                        <Route key={page} path={"/" + page} render={() =>
                            <Page page={Pages[page]} />
                        } />
                    )}
                </Switch>
            </div>
        )
    }
}
export default withRouter(withQueryString(App))
