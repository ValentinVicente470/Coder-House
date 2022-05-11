const express = require ('express')
const Contenedor = require ('./contenedor')
const { Router } = express
const app = express()

app.set ('views', './views')
app.set ('view engine', 'pug')

app.use ( express.static ('public') )
app.use ( express.urlencoded( { extended: true } ) )
app.use ( express.json() )

//router
const routerProductos = new Router() 


//endpoints
routerProductos.post ('/post', async (req, res) => {
    const obj = (req.body)
    await Contenedor.save(obj)
    res.redirect ('/api/productos')
})

routerProductos.get ('/lista', async (req, res) => {
    const objetos = await Contenedor.getall()
    res.render ( 'lista-productos', {objetos} )
})

routerProductos.get('/', async (req, res) => {
    const objeto = await Contenedor.getall()
    res.render('agregar-prods', { objeto })
})


//carga de routers
app.use ('/api/productos', routerProductos)


//server
const PORT = 8081

const server = app.listen(PORT, () => {
    console.log ('server HTTP escuchando en el puerto' + PORT)
})
server.on ('error', error => console.log (`error en el server ${error}`))