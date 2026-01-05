import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="bg-primary min-h-screen text-secondary flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
