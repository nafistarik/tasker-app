import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import TaskBoard from "./Components/TaskBoard";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <TaskBoard />
      </div>
      <Footer />
    </>
  );
}

export default App;
