import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

export default class RowWrapper extends Component {
    static defaultTransitionDuration = 500
    state = {
      opacity: new Animated.Value(0),
    }
    componentDidMount () {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: this.defaultTransitionDuration,
      }).start()
    }
    render () {
      return (
        <TouchableWithoutFeedback>
          <Animated.View style={{ ...this.props.styles, opacity: this.state.opacity }}>
            {this.props.children}
          </Animated.View>
        </TouchableWithoutFeedback>
      )
    }
  }