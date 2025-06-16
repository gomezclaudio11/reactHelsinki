const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'log in' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
  const createNote = async (page, content) => {  
    await page.getByRole('button', { name: 'new note' }).click()  
    await page.getByRole('textbox').fill(content)  
    await page.getByRole('button', { name: 'save' }).click()
}
    
export { loginWith, createNote }
/**
 Esto es desestructuración de objetos en JavaScript. 
 page es la pestaña del navegador controlada por el test.
Así accedés directo al API de interacción con la interfaz 
de tu app.
 Lo que en realidad estás recibiendo es un objeto con 
 varias propiedades que Playwright te pasa automáticamente

 page es una instancia del navegador, como si fuera una 
 pestaña abierta. Te permite:
    Navegar a URLs → page.goto(url)
    Hacer clics → page.click(...)
    Llenar formularios → page.fill(...)
    Leer contenido visible → page.getByText(...)
    Hacer capturas de pantalla, etc.
Es el objeto principal para interactuar con el navegador desde tus tests.
 */