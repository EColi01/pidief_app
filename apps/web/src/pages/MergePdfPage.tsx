import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/SortableItem";
import { UploadIcon } from "../components/UploadIcon";
import { FilePlus, RotateCcw, Trash2 } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const UploadPlaceholder = ({ onDrop, isDragActive }) => (
  <div
    className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-300 ease-in-out
        ${
          isDragActive
            ? "border-solid bg-secondary border-accent"
            : "bg-primary border-tertiary hover:bg-secondary hover:border-accent"
        }`}
  >
    <UploadIcon />
    {isDragActive ? (
      <p className="mt-4 text-lg font-semibold text-tertiary">
        Suelta para cargar
      </p>
    ) : (
      <div className="text-center mt-4">
        <p className="text-lg font-semibold text-tertiary">
          Arrastra tus archivos o haz clic aquí
        </p>
        <p className="text-sm text-tertiary mt-1">
          Selecciona los documentos a procesar
        </p>
      </div>
    )}
  </div>
);

export default function MergePdfPage() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setFiles((prevFiles) => [
          ...prevFiles,
          { id: file.name, file, preview: reader.result, rotation: 0 },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: { "application/pdf": [".pdf"] },
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const rotateFile = (id) => {
    setFiles(
      files.map((file) =>
        file.id === id
          ? { ...file, rotation: (file.rotation + 90) % 360 }
          : file
      )
    );
  };

  const [loading, setLoading] = useState(false);

  const handleMerge = async () => {
    setLoading(true);
    const formData = new FormData();
    for (const file of files) {
      if (file.rotation !== 0) {
        const pdfDoc = await PDFDocument.load(await file.file.arrayBuffer());
        const page = pdfDoc.getPage(0);
        page.setRotation(degrees(file.rotation));
        const pdfBytes = await pdfDoc.save();
        formData.append("files", new Blob([pdfBytes]), file.id);
      } else {
        formData.append("files", file.file, file.id);
      }
    }

    try {
      const response = await fetch("https://pidief-api.onrender.com/api/unir-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "merged.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.error("Failed to merge PDFs");
      }
    } catch (error) {
      console.error("Error merging PDFs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      {...getRootProps()}
      className="container mx-auto px-4 py-12 text-center"
    >
      <input {...getInputProps()} />
      {files.length === 0 ? (
        <div onClick={open}>
          <h2 className="text-4xl font-bold text-tertiary mb-3">Unir PDF</h2>
          <p className="text-tertiary text-lg mb-12">
            Combina varios archivos PDF en un único documento.
          </p>
          <UploadPlaceholder onDrop={onDrop} isDragActive={isDragActive} />
        </div>
      ) : (
        <div className="flex gap-8">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={files}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {files.map((file) => (
                  <SortableItem key={file.id} id={file.id}>
                    <div className="bg-secondary p-2 rounded-lg relative group">
                      <Document file={file.file}>
                        <Page
                          pageNumber={1}
                          width={200}
                          rotate={file.rotation}
                        />
                      </Document>
                      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => rotateFile(file.id)}
                          className="bg-accent p-1 rounded-full text-tertiary"
                        >
                          <RotateCcw size={16} />
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="bg-red-500 p-1 rounded-full text-white"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-tertiary text-sm mt-2 truncate">
                        {file.id}
                      </p>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
          <div className="w-1/4 flex flex-col gap-4">
            <button
              className="bg-accent text-tertiary p-4 rounded-lg flex items-center justify-center gap-2"
              onClick={open}
            >
              <FilePlus />
              Añadir más archivos
            </button>
            <button
              className="bg-red-500 text-white p-4 rounded-lg"
              onClick={handleMerge}
              disabled={loading}
            >
              {loading ? "Uniendo..." : "Unir PDF"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}