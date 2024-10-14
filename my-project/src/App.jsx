import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicFormComponent from './components/useDynamicForm'

function App() {
  return (

    <div className='form-container '>
      <header>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </header>
      <DynamicFormComponent />

    </div>
  )
}

export default App
