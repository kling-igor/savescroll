import React, { Component } from "react";
import { createGlobalStyle } from 'styled-components'
import { observable } from 'mobx'
import { observer, Provider } from 'mobx-react'

const GlobalStyle = createGlobalStyle`

html {
    height: 100%;
    margin: 0;
  }

  body {
    /* @import "~@blueprintjs/core/lib/css/blueprint.css"; */
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
    overflow: hidden;
    background-color: white;
    height: 100%;
    margin: 0;
    overflow: hidden !important;
  }

  #app {
    /* background: #272822; */
    min-height: 100%;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    padding: 8px;
  }
`


class Store {
  @observable scrollTop = 0
}

@observer
class ScrollableContainer extends Component {

  scrollRef = React.createRef()

  componentDidMount() {
    this.scrollRef.current.scrollTop = this.props.store.scrollTop;
  }

  handleScroll = event => {
    this.props.store.scrollTop = this.scrollRef.current.scrollTop
  }


  render() {
    return (
      <div ref={this.scrollRef} style={{ height: '500px', overflow: 'scroll' }} onScroll={this.handleScroll}>
        <div style={{ height: '400px', backgroundColor: 'yellow' }}></div>
        <div style={{ height: '400px', backgroundColor: 'magenta' }}></div>
      </div>
    )
  }
}

const store = new Store


@observer
export default class App extends Component {

  state = { checked: false }

  handleCheck = event => {
    this.setState((state, props) => ({ checked: !state.checked }))
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <input type="checkbox" onChange={this.handleCheck} defaultChecked={this.state.checked} />
        {this.state.checked ? (<div>HELLO</div>) : (<ScrollableContainer store={store} />)}
      </>
    )
  }
}  