const Registry = {}
Registry.getDefaultState = () => ({todos: [], inputValue: "", filter: "all"})
Registry.getInitialState = () => {
  //groundwork for storing todos in cookies etc
  const storage = localStorage.getItem("storage")
  return storage !== null ? JSON.parse(storage) : Registry.getDefaultState()
}
export default Registry