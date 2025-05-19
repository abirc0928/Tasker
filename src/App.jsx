import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import TaskBoard from "./components/task/TaskBoard"


function App() {

  return (
    <>

      <Header></Header>
      <div className="flex flex-col justify-center items-center">
        <Hero></Hero>
        <TaskBoard></TaskBoard>
      </div>

      <Footer></Footer>
    </>
  )
}

export default App
