import { useState, useEffect } from "react";

function ListItem({value, index ,removeTask, setCount}){
  const [isCompleted, setIsCompleted] = useState(false);
  const setCompleted = (e) => {
    e.target.checked ? setCount((count) => count+1) : setCount((count) => count-1);
    
    setIsCompleted(() => !isCompleted);
  };

  return(
    <div className={isCompleted ?"p-2 border-2 mb-1 rounded hover:bg-slate-100 flex items-center opacity-60":"p-2 border-2 mb-1 rounded hover:bg-slate-100 flex items-center"}>
      <input type="checkbox" className="me-1" id={index} onClick={setCompleted}/>
      <span className={isCompleted ?"line-through decoration-wavy grow":"grow"}>{value}</span>
      <button onClick={() => removeTask(index)}>❌</button>
    </div>
  )
}

function AddNEwComponent({title,listArray, setListArray, removeTask}){
  const [isInput, setIsInput] = useState(false);
  const [items, setItems] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let a = listArray.map( (value, index) => <ListItem value={value} index = {index} key={index} removeTask={removeTask} setCount={setCount} /> )
    setItems(() => a);
  }, [listArray, removeTask])

  const hand = () => {
    setIsInput(() =>!isInput);
  }

  const checkEnter = (e) => {
    if(e.key === "Enter"){
      setListArray(() =>[ ...listArray, e.target.value ])
      setIsInput(() =>!isInput)
    }
  };

  const handleFocusOut = (e) => {
    let val = e.target.value;
    if(val === ""){
      setIsInput(() =>!isInput)
    }else{
      setListArray(() =>[ ...listArray, e.target.value ])
      setIsInput(() =>!isInput)
    }
  };

  return (
    <>
      <div className="bg-slate-300 flex justify-between items-center p-5 rounded-t-sm">
        <div>
          <p className="text-4xl">{title}</p>
          <p className="text-xs">{count}/{listArray.length} Completed</p>
        </div>
        <button className="bg-emerald-500 text-white px-2 py-1 rounded-sm normal-case"
          onClick={hand}
        >+ Add new {title}</button>
      </div>

      <div id="abc" className="p-2 border-2 border-t-0"> 
        <ul>
          { items }
          {
            isInput ? <li> <input autoFocus className="w-full mt-2 bg-slate-200 p-2 rounded-sm" onKeyDown={checkEnter} onBlur={handleFocusOut} /></li> : null
          }
        </ul>
      </div>
      <p className="text-xs mt-1">Crafted with ❤ by Shuham</p>
    </>
  )
}


function App() {
  const [listArray, setListArray] = useState(["item 1", "item 2", "item 3", "item 4", "item 5"]);
  const removeTask = (index) => {
    let tempArray = [...listArray]
    tempArray.splice(index, 1);
    setListArray(tempArray);
  };

  return (
    <div className="max-w-xl mx-auto mt-5">
        <AddNEwComponent title="Task" listArray = {listArray} setListArray = {setListArray} removeTask = {removeTask} />
    </div>
  );
}
export default App;