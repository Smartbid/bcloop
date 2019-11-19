import React, { Component } from 'react'

export default function withQueryString(WrappedComponent) {

    return class WrapperComponent extends Component {
        
        componentDidMount() {
            let search = this.getUrlParams().toString()
            this.setState({ search: search })
        }

        componentDidUpdate() {
            let search = this.getUrlParams().toString();
            if (this.didQueryChange(search)) this.setState({ search: search })
        }

        didQueryChange(search) {
            return this.state.search !== search
        }

        getUrlParams() {
            if (!this.props.location.search) return new URLSearchParams()
            return new URLSearchParams(this.props.location.search)
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}
