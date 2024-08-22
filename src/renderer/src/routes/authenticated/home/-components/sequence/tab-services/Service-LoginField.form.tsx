export const ServiceLoginFieldForm = () => {
  return (
    <div className="flex flex-col">
      <div className="w-min">
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" name="username" id="username" />
      </div>
      <div className="w-min">
        <label htmlFor="password">Contraseña</label>
        <input type="password" name="password" id="password" />
      </div>
    </div>
  )
}
