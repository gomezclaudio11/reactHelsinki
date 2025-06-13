import { render, screen } from '@testing-library/react' //testea componentes de react desde el punto de vista del usuario
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" >
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    await screen.findAllByText('togglable content')//Representa el DOM completo renderizado en los test. Es un metodo asincrono, busca elementos en el DOM
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')// verifica si un elemento del DOM tiene un estilo especifico aplicado
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()//simula interacciones del usuario setup para usar metodos asincronicos como click
    const button = screen.getByText('show...') //busca el boton con el texto show
    await user.click(button) //simula que el usuario hace click

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})