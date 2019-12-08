const Registry = {}
Registry.getInitialState = () => {
  //groundwork for storing todos in cookies etc
  return {todos: [], inputValue: ""}
}
export default Registry