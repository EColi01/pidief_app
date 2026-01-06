import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

// A simple SVG Upload Icon
const UploadIcon = () => (
    <svg className="w-12 h-12 mx-auto text-tertiary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
);


export default function Dropzone() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // In a real app, you'd handle the file upload here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    // Optionally, you can restrict file types
    // accept: { 'application/pdf': ['.pdf'] }
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ease-in-out
        ${isDragActive 
            ? 'border-solid bg-secondary border-accent' 
            : 'bg-primary border-tertiary hover:bg-secondary hover:border-accent'}`
        }
    >
      <input {...getInputProps()} />
      <UploadIcon />
      {isDragActive ? (
        <p className="mt-4 text-lg font-semibold text-tertiary">Suelta para cargar</p>
      ) : (
        <div className="text-center mt-4">
            <p className="text-lg font-semibold text-tertiary">Arrastra tus archivos o haz clic aquí</p>
            <p className="text-sm text-tertiary mt-1">Selecciona los documentos a procesar</p>
        </div>
      )}
    </div>
  );
}
