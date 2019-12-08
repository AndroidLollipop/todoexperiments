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
  //contingency fallback to avoid erasing state
  return state
}, {todos: []})(Callbags.map(x => ({
  ACTION: "newtodo",
  PARAMETERS: x
}))(Callbags.mergeSources(
  Callbags.rangeInterval(1, 0, 1000),
  Source
)))