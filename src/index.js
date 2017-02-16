import React from 'react'
import debounce from 'lodash.debounce'

export default class ShowOnScrollTop extends React.Component {
  state = {
    isScrollingToTop: true,
    lastScrollPosition: 0,
  }

  scrollHandler = debounce(event => {
    const scrollPos = window.scrollY

    this.setState({
      isScrollingToTop: scrollPos < this.state.lastScrollPosition || scrollPos === 0,
      lastScrollPosition: scrollPos,
    })
  }, 200)

  componentDidMount(){
    window.addEventListener('scroll', this.scrollHandler)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.scrollHandler)
  }

  render(){
    return (
      <div
        style={{
          transform: this.state.isScrollingToTop ? 'translateY(0)' : 'translateY(-1000px)',
          transition: '0.8s ease-in-out transform',
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
