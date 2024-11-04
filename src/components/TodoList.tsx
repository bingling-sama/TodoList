import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import { Todo } from "../services/types"
import TodoItem from "./TodoItem"
import "../styles/TodoList.css"

function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([])
	const [text, setText] = useState("")
	const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All")

	const editTodo = (index: number, callback: (todo: Todo) => Todo) => {
		setTodos(todos => {
			todos[index] = callback(todos[index])
			return todos
		})
	}

	const removeTodo = (index: number) => {
		setTodos(todos => {
			const newTodos = todos.filter((_, i) => i !== index)
			return newTodos
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && text !== "") {
			setTodos([...todos, {
				id: uuidv4(),
				content: text,
				completed: false
			}])
			setText("")
		}
	}

	const filterTodos = todos.filter(todo => {
		if (filter === "All") return true
		if (filter === "Active") return !todo.completed
		if (filter === "Completed") return todo.completed
		return false
	})

	return (<>
		<div className="form">
			<svg
				className="fullfil"
				onClick={() => setTodos(todos.map(todo => {todo.completed = true; return todo}))}
				xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 448 512"><path fill="currentColor" d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7L86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" /></svg>
			<input
				type="text"
				value={text}
				placeholder="What needs to be done?"
				onChange={e => setText(e.target.value)}
				onKeyDown={e => handleKeyDown(e)}
				autoFocus
			/>
		</div>
		{filterTodos.map((todo, index) => (<TodoItem
			todo={todo}
			key={todo.id}
			setTodo={({content, completed}) => {
				editTodo(index, todo => {
					todo.content = content
					todo.completed = completed
					return todo
				})
			}}
			removeTodo={() => removeTodo(index)}
		/>))}
		<div className="pagination">
			<div className="left">{todos.filter(todo => !todo.completed).length} items left!</div>
			<div className="tags">
				<span className={filter === "All" ? "active" : ""} onClick={() => setFilter("All")}>All</span>
				<span className={filter === "Active" ? "active" : ""} onClick={() => setFilter("Active")}>Active</span>
				<span className={filter === "Completed" ? "active" : ""} onClick={() => setFilter("Completed")}>Completed</span>
			</div>
			<div className="clear" onClick={() => setTodos(todos.filter(todo => !todo.completed))}>Clear completed</div>
		</div>
	</>)
}

export default TodoList