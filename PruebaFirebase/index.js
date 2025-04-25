import { db, collection, doc, addDoc, getDocs, updateDoc, deleteDoc, } from "./firebase-config.js";


const todoForm = document.getElementById('todo_form');
const btnSubmit = document.getElementById('btn_todo_form');
const tabla = document.getElementById('tabla');

const getContactos = () => getDocs(collection(db, 'Contactos'));
const collectionRef = collection(db, 'Contactos');

let idEditando = null;

// CREATE
const crearContacto = async (nombre, email, telefono) => {

    const contacto =
    { // Objeto enviado a set
        nombre, // == nombre: nombre
        email, // == email: email
        telefono // == telefono: telefono
    };

    await addDoc(collectionRef, contacto);
}

// async indica que se va a usar código asincrónico que devuelve una promesa automáticamente
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Desactivar el botón 
    btnSubmit.disabled = true;
    btnSubmit.textContent = idEditando ? "Guardando..." : "Actualizando...";

    const nombre = todoForm['todo_nombre'].value;
    const email = todoForm['todo_email'].value;
    const telefono = todoForm['todo_telefono'].value;

    if (idEditando) {
        await actualizarContacto(idEditando, nombre, email, telefono)
    } else {
        await crearContacto(nombre, email, telefono);
    }

    todoForm.reset();
    btnSubmit.disabled = false;
    btnSubmit.textContent = "Guardar";
    idEditando = null;
    location.reload();
});

// READ
window.addEventListener('DOMContentLoaded', async (e) => {
    const docSnap = await getContactos();

    for (const doc of docSnap.docs) {
        tabla.innerHTML += `
        <tr>
        <td class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        ${doc.id}</td>
        <td class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        ${doc.data().nombre}</td>
        <td class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        ${doc.data().email}</td>
        <td class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        ${doc.data().telefono}</td>
        <td onclick="eliminar('${doc.id}')" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        <button class="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition hover:cursor-pointer disabled:bg-blue-300 p-2">
        Delete
        </button>
        </td>
        <td onclick="editar('${doc.id}', '${doc.data().nombre}', '${doc.data().email}', '${doc.data().telefono}')" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
        <button class="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition hover:cursor-pointer disabled:bg-blue-300 p-2">
        Editar
        </button>
        
        </td>
        </tr>
        `;
    }
});

// UPDATE
window.editar = (id, nombre, email, telefono) => {
    todoForm['todo_nombre'].value = nombre;
    todoForm['todo_email'].value = email;
    todoForm['todo_telefono'].value = telefono;

    idEditando = id;
    btnSubmit.textContent = 'Actualizar';
}

const actualizarContacto = async (idEditando, nombre, email, telefono) => {
    const docRef = doc(db, 'Contactos', idEditando);

    const edicion = {
        idEditando,
        nombre,
        email,
        telefono
    }

    await updateDoc(docRef, edicion);

}



// DELETE
window.eliminar = async (id) => {
    await deleteDoc(doc(db, 'Contactos', id));
    location.reload();
};