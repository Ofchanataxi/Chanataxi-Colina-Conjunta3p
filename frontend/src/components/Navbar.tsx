import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

export const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const items = [
        { label: "Investigadores", icon:"pi pi-users", command: ()=> navigate("/investigadores") },
        { label: "Líneas de Investigación", icon:"pi pi-book", command: ()=> navigate("/lineas") },
        { label: "Disponibilidad", icon:"pi pi-calendar", command: ()=> navigate("/disponibilidad") },
        { label: "Grupos", icon:"pi pi-sitemap", command: ()=> navigate("/grupos") }
    ];

    return <Menubar model={items} />;
}