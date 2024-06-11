export function Input(props) {
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={props.name} className="uppercase text-sm font-bold mb-2 text-my-gray-400">{props.content}</label>
      <input className="bg-transparent border-my-gray-600 border rounded-sm p-2 focus:border-blue-700 hover:border-my-gray-200" 
        type={props.type} 
        placeholder={props.placeholder} 
        id={props.name} 
        value={props.state}
        onChange={(e) => props.setState(e.target.value)}
      />
    </div>
  )  
}