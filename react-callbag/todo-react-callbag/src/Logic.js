import Callbags from './callbags.js'
import Registry from './Registry.js'
const SourceFromCallback = Callbags.factoryFromCallback()
const Source = SourceFromCallback.callbag
Registry.Dispatch = SourceFromCallback.callback
Registry.Firehose = Callbags.mergeSources(
  Callbags.rangeInterval(1, 0, 1000),
  Callbags.map(x => x)(Source)
)