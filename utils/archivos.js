'use strict'
import  fs  from 'fs';
class Archivo{
    constructor(archivo){
        this.archivo = archivo;
        this.isObject = (obj)=>{
            return obj != null && obj.constructor.name === "Object"
        }
    }
    leer (){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.archivo, 'utf8', (err,data)=>{
                if (err) reject([]);
                resolve(data);
              });
        })
    }
    guardar(producto){
        return new Promise(async (resolve,reject)=>{
            if(!this.isObject(producto)){
                return reject('texto no valido')
            }
            if(!producto.title&&!producto.price&&!producto.thumbail){
                return reject('faltan datos')
            }
            try {
                let data = await this.leer(producto);
                data = data.length?JSON.parse(data):data;
                let cantidadDatos = data.length;
                producto = [...data,{id:cantidadDatos+1,...producto}];
                fs.writeFile(this.archivo, JSON.stringify(producto), (err) =>{
                    if(err) return reject('Hubo un error')
                    return resolve('done')
                }); 
            } catch (error) {
                return reject('el archivo no existe')
            }
        })
    }
    async borrar(){
        try {
            let respuesta = await fs.unlinkSync(this.archivo)
            return 'el archivo se elimino'
          } catch(err) {
            return 'no se pudo eliminar el archivo'
          }
    }

}

module.exports = Archivo;