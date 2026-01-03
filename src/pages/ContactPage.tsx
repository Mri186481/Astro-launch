import { useForm } from 'react-hook-form';
import { useState } from 'react';

// Estructura de los datos del formulario
type ContactFormData = {
  name: string;
  email: string;
  department: string;
  message: string;
  terms: boolean;
};

export default function ContactPage() {
  // Configuración de la librería externa
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  
  // Estados para controlar la interfaz visual (enviando y éxito, estado inicial false)
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  // Función auxiliar para guardar en LocalStorage 
  const guardarEnLocalStorage = (datos: ContactFormData) => {
    // Leo lo que ya había guardado (o hafo un array vacío si es la primera vez)
    const mensajesGuardados = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    // Añado el nuevo mensaje a la lista
    mensajesGuardados.push(datos);
    
    // 3. Vuelvo a guardar la lista actualizada en el navegador
    localStorage.setItem('contactMessages', JSON.stringify(mensajesGuardados));
  };

  // Esta función SOLO se ejecuta si todos los campos son válidos
  const enviarDatos = (data: ContactFormData) => {
    setEnviando(true);

    // Simula una espera de red o transmision de 1.5 segundos
    setTimeout(() => {
      //esto seria el fetch, lo envio a consola para control/depuracion  
      console.log("Formulario válido y enviado:", data);
      
      // Guarda los datos
      guardarEnLocalStorage(data);

      setEnviando(false);
      setExito(true);
      reset(); // Limpia los campos del formulario
    }, 1500);
  };

  return (
    <main className="page-container contact-page">
      <h1>🛰️ Contacto y Soporte</h1>
      <p className="contact-intro">
        ¿Tienes alguna duda sobre nuestros lanzamientos? Completa el formulario y te responderemos a la mayor brevedad.
      </p>

      {/* RENDERIZADO CONDICIONAL: Si hubo éxito muestra mensaje, si no, el formulario */}
      {exito ? (
        <div className="success-box">
          <h3>¡Mensaje Recibido Correctamente! 📡</h3>
          <p>Hemos recibido tu consulta. Nos pondremos en contacto contigo pronto.</p>
          <button onClick={() => setExito(false)} className="btn-reset">
            Enviar otro reporte
          </button>
        </div>
      ) : (
        //Al enviar el formulario (onSubmit), 
        //deja que la librería lo maneje (handleSubmit) 
        //y si todo está bien, ejecuta la función (enviarDatos)
        <form onSubmit={handleSubmit(enviarDatos)} className="contact-form">
          
          {/* CAMPO 1: NOMBRE */}
          <div className="form-group">
            <label>Nombre completo</label>
            <input 
              type="text" 
              placeholder="Ej: Neil Armstrong"
              // Validaciones: Obligatorio y mínimo 3 letras, Uso de la libreria react-hook-form
              // register genera los eventos necesarios (onChange, onBlur, etc.) y '...' los "esparce" dentro del input
              {...register("name", { 
                required: "El nombre es obligatorio", 
                minLength: { value: 3, message: "El nombre debe tener al menos 3 letras" }
              })}
            />
            {/* Si hay error, se muestra el mensaje en rojo */}
            {errors.name && <span className="error-msg">{errors.name.message}</span>}
          </div>

          {/* CAMPO 2: EMAIL */}
          <div className="form-group">
            <label>Correo electrónico</label>
            <input 
              type="email" 
              placeholder="nombre@ejemplo.com"
              // Validación con Patrón (Regex) para email
              //S+: uno o mas caracteres que sean cualquier cosa que no sea un espacio
              //@ Busca que este este caracter literalmente en medio
              //\S+ Despues de la @, otra vez un monton de caracteres que no sean espacios
              //$ final de la linea
              //i al final es que sea insensible a mayusculas/minusculas
              {...register("email", { 
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "El formato del email no es correcto"
                }
              })}
            />
            {errors.email && <span className="error-msg">{errors.email.message}</span>}
          </div>

          {/* CAMPO 3: DEPARTAMENTO (SELECT) */}
          <div className="form-group">
            <label>Departamento</label>
            <select {...register("department", { required: "Selecciona un departamento" })}>
              <option value="">-- Selecciona una opción --</option>
              <option value="soporte">Soporte Técnico</option>
              <option value="prensa">Prensa y Medios</option>
              <option value="avistamiento">Información General</option>
            </select>
            {errors.department && <span className="error-msg">{errors.department.message}</span>}
          </div>

          {/* CAMPO 4: MENSAJE (TEXTAREA) */}
          <div className="form-group">
            <label>Mensaje</label>
            <textarea 
              rows={5}
              placeholder="Escribe aqui tu consulta..."
              {...register("message", { 
                required: "No puedes enviar una transmisión vacía",
                minLength: { value: 10, message: "El mensaje es muy corto (mínimo 10 caracteres)" }
              })}
            ></textarea>
            {errors.message && <span className="error-msg">{errors.message.message}</span>}
          </div>

          {/* CAMPO 5: CHECKBOX */}
          <div className="form-group checkbox-row">
            <input 
              type="checkbox" 
              id="terms"
              {...register("terms", { required: "Debes aceptar la política de privacidad" })}
            />
            <label htmlFor="terms">He leído y acepto la política de privacidad.</label>
          </div>
          {errors.terms && <span className="error-msg">{errors.terms.message}</span>}

          {/* BOTÓN DE ENVÍO Si 'enviando' es true, el botón se bloquea (se pone gris/inactivo) disabled={enviando}*/}
          <button type="submit" className="submit-btn" disabled={enviando}>
            {/*¿está enviando? SI -> Escribe "Transmitiendo..."(durante 1,5 sg que he puesto antes simulando transmision) NO -> Escribe "Iniciar Transmisión" */}
            {enviando ? "Enviando..." : "Enviar mensaje 🚀"}
          </button>
        
        </form>
      )}
    </main>
  );
}