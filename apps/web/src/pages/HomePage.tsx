import ToolCard from '../components/ToolCard';

// Placeholder SVG Icons
const MergeIcon = () => (
  <svg className="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"></path>
  </svg>
);

const SplitIcon = () => (
  <svg className="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
  </svg>
);

const CompressIcon = () => (
    <svg className="w-8 h-8 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4"></path>
    </svg>
);


export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-tertiary mb-3">Tus Herramientas PDF Favoritas</h2>
        <p className="text-tertiary text-lg mb-12">
          Organiza, edita y convierte tus documentos PDF con facilidad.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ToolCard 
            icon={<MergeIcon />}
            title="Unir PDF"
            description="Combina varios archivos PDF en un único documento."
          />
          <ToolCard 
            icon={<SplitIcon />}
            title="Dividir PDF"
            description="Extrae una o más páginas de un archivo PDF."
          />
          <ToolCard 
            icon={<CompressIcon />}
            title="Comprimir PDF"
            description="Reduce el tamaño de tus archivos PDF."
          />
          {/* Add more ToolCard components here as you add features */}
        </div>
      </div>
    </div>
  );
}
