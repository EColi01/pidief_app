import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import MergePdfPage from "./pages/MergePdfPage";
import SplitPdfPage from "./pages/SplitPdfPage";
import CompressPdfPage from "./pages/CompressPdfPage";

function App() {
  return (
    <div className="bg-primary min-h-screen text-tertiary flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/unir-pdf" element={<MergePdfPage />} />
          <Route path="/dividir-pdf" element={<SplitPdfPage />} />
          <Route path="/comprimir-pdf" element={<CompressPdfPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
