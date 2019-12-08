import Callbags from './callbags.js'
import Registry from './Registry.js'
Registry.Firehose = Callbags.rangeInterval(1, 10, 1000)
const SourceFromCallback = Callbags.factoryFromCallback()
const Source = SourceFromCallback.callbag
Registry.Dispatch = SourceFromCallback.callback