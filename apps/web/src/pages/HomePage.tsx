import Dropzone from "../components/Dropzone";

export default function HomePage() {
    return (
        <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-4xl font-bold text-secondary mb-3">Tu Herramienta PDF Online</h2>
                <p className="text-tertiary text-lg mb-10">
                    Sube y transforma tus archivos PDF con facilidad.
                </p>
                <Dropzone />
            </div>
        </div>
    )
}
