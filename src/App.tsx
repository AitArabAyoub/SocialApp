import 'bootstrap-icons/font/bootstrap-icons.css'
import { Outlet } from "react-router-dom"
import SearchModal from './components/SearchModal'

function App() {
  return (
    <div className="">
      <Outlet/>
      <SearchModal/>
    </div>
  )
}

export default App
