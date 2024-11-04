import TodoList from './components/TodoList'

function App() {
	return (
		<>
			<p className='title'>todos</p>
			<div className='container'>
				<TodoList />
			</div>
		</>
	)
}

export default App