import { create } from "zustand";
import axios from "axios";

const usePermisoStore = create((set) => ({
    permisos: [], // Lista de permisos
    roles: {}, // Objeto para mapear rolId con su nombre

    // Agregar un nuevo permiso
    addPermiso: async (permiso) => {
        try {
            const response = await axios.post('http://localhost:3001/permiso', permiso);
            set((state) => ({ permisos: [...state.permisos, response.data] })); // Actualiza la lista de permisos
        } catch (error) {
            console.log("Error al agregar permiso:", error.message);
        }
    },

    // Obtener todos los permisos
    fetchPermisos: async () => {
        try {
            const response = await axios.get('http://localhost:3001/permiso');
            set({ permisos: response.data });
        } catch (error) {
            console.log("Error al obtener permisos:", error.message);
        }
    },

    // Eliminar un permiso
    deletePermiso: async (permisoId) => {
        try {
            await axios.delete(`http://localhost:3001/permiso/${permisoId}`);
            set((state) => ({
                permisos: state.permisos.filter(permiso => permiso.permisoId !== permisoId)
            })); // Filtra y elimina el permiso localmente
        } catch (error) {
            console.log("Error al eliminar permiso:", error.message);
        }
    },

    // Actualizar un permiso
    updatePermiso: async (permisoId, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:3001/permiso/${permisoId}`, updatedData);
            set((state) => ({
                permisos: state.permisos.map((permiso) =>
                    permiso.permisoId === permisoId ? { ...permiso, ...response.data } : permiso
                ),
            })); // Actualiza el permiso localmente
        } catch (error) {
            console.log("Error al actualizar permiso:", error.message);
        }
    },

    // Obtener roles desde la API
    fetchRoles: async () => {
        try {
            const response = await axios.get('http://localhost:3001/rol'); // Ajusta la URL según tu API
            const rolesData = response.data.reduce((acc, role) => {
                acc[role.rolId] = role.rol; // Mapea rolId con el nombre del rol
                return acc;
            }, {}); // Transforma la lista de roles en un objeto
            set({ roles: rolesData }); // Actualiza el estado con los roles
        } catch (error) {
            console.log("Error al obtener roles:", error.message);
        }
    },
}));

export default usePermisoStore;
