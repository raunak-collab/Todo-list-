import { useState, useEffect } from 'react'
import Navbar from './assets/components/navbar'
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBin5Fill } from "react-icons/ri";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])

  const setlocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newTodos)
    setlocal()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newTodos)
    // setlocal()


  }


  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    setlocal()

  }

  const handleChange = (e) => {
    settodo(e.target.value)

  }

  const handleCheckBox = (e) => {
    console.log(e.target)
    let id = e.target.name
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id
    })

    console.log(index)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    setlocal()

  }

  const togglefinished = () => {
    setshowFinished(!showFinished)
  }
  

  



  return (
    <>
      <Navbar />
      <div className="container w-[85%] md:w-[50%] bg-violet-100 my-[20px] p-5 rounded-xl min-h-[84vh] mx-auto">
        <h1 className='text-center font-bold mb-2 md:text-xl  text-[18px]'>iTask - Manage your todos at one place</h1>
        <div className="addTodo">
          <h2 className='text-slate-800 md:text-[17px] text-[15px] font-bold mb-3 my-[13px] relative left-[7px]'>Add a Todo</h2>
          <input className='w-[100.2%] rounded-[15px] mb-1 h-[28px]' onChange={handleChange} value={todo} type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-indigo-400 transition-all text-sm font-bold hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-[3px] mx-[6px] px-[11px] rounded-md mt-2 mb-4 flex justify-center items-center md:justify-center sm:relative left-[5px]  w-[97%]'>Save</button>
        </div>
        <input className='my-3 relative left-3 mr-3' onChange={togglefinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className='font-bold text-lg relative left-3 text-slate-800'>Your Todos</h2>
        <div className="todos">

          {todos.length === 0 && <div className='m-5 flex justify-center text-[18px]'>No Todos to display</div>}

          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo  font-sans text-[15px] w-[97%] flex m-[14px] justify-between">
              <input name={item.id} type="checkbox" onChange={handleCheckBox} value={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons flex items-center justify-center h-full">
                <button onClick={(e) => {handleEdit(e, item.id) }} className='bg-indigo-400 transition-all text-sm font-bold hover:bg-indigo-700 text-white py-[3px] mx-2 px-[11px] rounded-md'><FaEdit /></button>
                <button onClick={(e) => {handleDelete(e, item.id) }} className='bg-indigo-400 mx-1 transition-all text-sm font-bold hover:bg-indigo-700 text-white py-[3px] px-[11px] rounded-md'><RiDeleteBin5Fill /></button>
              </div>
            </div>
          }
          )}

        </div>
      </div>
    </>
  )
}

export default App
