import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setShowfinished(!showfinished)
  }
  




  const handleEdit = (e, id) => {
    let t = todos.filter((item) => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLs()

  }

  const handleDelete = (e, id) => {
    if (confirm("Are U sure you want to delete this todo?")) {
      let newTodos = todos.filter((item) => {
        return item.id !== id

      })
      setTodos(newTodos)
      saveToLs()
    }

    // if (confirm("Are you sure you want to delete this item?")) {
    //   let newTodos = todos.filter((item) => {
    //     return item.id !== id; // Return true for items to keep, false for the item to remove
    //   });
    //   setTodos(newTodos);
    // }

  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex((item) => {
      return item.id === id;
    })

    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLs()


  }



  return (
    <>
      <Navbar />
      <div className="mx-4 md:container md:mx-auto  my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-serif font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-4 py-2 
          border border-purple-900' />
          <button  disabled= {todo.length <= 3} className='bg-violet-800 hover:bg-violet-900 p-2 px-10 py-1   text-sm font-bold text-white disabled:bg-violet-500 rounded-full mx-2' onClick={handleAdd}>Save</button>
          </div>
        </div>
        <input id='show' className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} /> 
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-10 my-2"></div>
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos overflow-auto ove h-[50vh]">
          {todos.length === 0 && <div className='m-5 '>No Todos to display</div>}

          {todos.map(item => {

            return (showfinished || !item.isCompleted)&& <div className="todo flex my-3 justify-between border border-black p-3 m-2 hover:bg-purple-200 rounded-md" key={item.id}>
                <div className='flex gap-5 '>
                  <input onChange={handlecheckbox} type="checkbox" name={item.id} checked={todo.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 px-3 py-1 mx-1  text-sm font-bold text-white rounded-md'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-900 p-2 px-3 py-1 mx-1  text-sm font-bold text-white rounded-md'><MdDelete /></button>
                </div>
              </div>
            
          })}
        </div>

      </div>
    </>
  )
}

export default App
