import Callbags from './callbags.js'
import Registry from './Registry.js'
const SourceFromCallback = Callbags.factoryFromCallback()
const Source = SourceFromCallback.callbag
const mapSponge = (func, initial) => {
  var current = initial
  return Callbags.map(x => {
    return current = func(current, x)
  })
}
const mapState = (func, initial) => {
  var current = initial
  return Callbags.mapFilterAllChannelsFromFactory(() => [x => {
    var ret
    [current, ret] = func(current, x)
    return ret
  }])
} // could have done this better i admit
const InterCallbag = Callbags.factoryFromCallback()
Registry.Dispatch = SourceFromCallback.callback
Registry.Firehose = mapSponge((state, dispatched) => {
  if (dispatched.ACTION === "newtodo") {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          todoText: dispatched.PARAMETERS
        }
      ]
    }
  }
  else if (dispatched.ACTION === "inputchange") {
    return {
      ...state,
      inputValue: dispatched.PARAMETERS
    }
  }
  else if (dispatched.ACTION === "inputenter") {
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          todoText: state.inputValue
        }
      ],
      inputValue: ""
    }
  }
  else if (dispatched.ACTION === "toggleinterval") {
    InterCallbag.callback(1)
  }
  //contingency fallback to avoid erasing state
  return state
}, Registry.getInitialState())(Callbags.mergeSources(
  Source,
  Callbags.map(x => ({
    ACTION: "newtodo",
    PARAMETERS: x
  }))(mapState((current, x) => {
    if (x.streamid === 2) {
      return [!current, Callbags.signalIgnore]
    }
    else if (x.streamid === 1) {
      return current === true ? [current, x.value] : [current, Callbags.signalIgnore]
    }
    return [current, Callbags.signalIgnore]
  }, false)(Callbags.mergeSources(Callbags.map(x => ({streamid: 2, value: x}))(InterCallbag.callbag),
    Callbags.map(x => ({streamid: 1, value: x}))(Callbags.rangeInterval(1, 0, 1000))))
)))