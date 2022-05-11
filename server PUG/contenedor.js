const { promises: fs } = require ('fs')

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo
    }

    async save ({name, price, thumbnail}) {
        try{ 
            const objs = await this.getall()
            let newID = 1
            if (objs.length > 0) {
                newID = objs[objs.length - 1].id + 1
            }

            const newObj = {name: name, price: price, thumbnail: thumbnail, id: newID}
            objs.push(newObj)

            fs.writeFile (this.archivo, JSON.stringify (objs, null, 2))
            console.log ('guardado')
            console.log (objs [objs.length - 1] )
        }
        catch (err) {
            console.log ('error al escribir', err)
        }

    }

    async getall() {
        try { 
            const objs = await fs.readFile(this.archivo, 'utf-8')
            return JSON.parse (objs)
        }
        catch (err) {
            return err
        }
    }

}


const archivo1 = new Contenedor ('./productos.txt')

module.exports = archivo1