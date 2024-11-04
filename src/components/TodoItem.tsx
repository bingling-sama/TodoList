import { useState } from "react"
import { Todo } from "../services/types"

function TodoItem({ todo, setTodo, removeTodo }: { todo: Todo, setTodo: ({content, completed}: {content: string, completed: boolean}) => void, removeTodo: () => void }) {
	const [editing, setEditing] = useState(false)
	const [completed, setCompleted] = useState(todo.completed)
	const [text, setText] = useState(todo.content)

	const check = () => {
		setCompleted(!completed)
		setTodo({
			content: todo.content,
			completed: !completed
		})
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && text !== "") {
			setTodo({
				content: text,
				completed: completed
			})
			setEditing(!editing)
		}
	}

	return (
		<div className={"item " + (completed ? "checked" : "")}>
			<div
				className="check"
				onClick={check}
			>
				<svg viewBox="0 0 64 64" height="2em" width="2em"><path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938"></path></svg>
			</div>
			<div className="content"
				onDoubleClick={() => setEditing(!editing)}
			>{editing
				? <input
					type="text"
					value={text}
					onChange={e => setText(e.target.value)}
					onKeyDown={handleKeyDown}
					onBlur={() => setEditing(!editing)}
					autoFocus
				/>
				: <span
				>{todo.content}</span>
			}</div>
			<div
				className="delete"
				onClick={removeTodo}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 384 512"><path fill="#7AB2D3" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7L86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256L41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256z"/></svg>
			</div>
		</div>
	)
}

export default TodoItem