'use strict'
import fs  from'fs';
class MonitorRutas{
    constructor(archivo){
        this.archivo = archivo;
        this.isObject = (obj)=>{
            return obj != null && obj.constructor.name === "Object"
        }
    }
    leer (){
        return new Promise((resolve,reject)=>{
            fs.readFile(this.archivo, 'utf8', (err,data)=>{
                if (err) return reject('no se puede leer el archivo de monitoreo');
                return resolve(data);
              });
        })
    }
    guardar(ruta){
        return new Promise(async (resolve,reject)=>{
            if(!ruta){
                return reject('ruta invalida')
            }
            try {
                let data = await this.leer();
                data = this.isObject(JSON.parse(data))?JSON.parse(data):{};
                if(!data[ruta]){
                    data = {...data, [ruta]:1}
                }else{
                    data[ruta] = data[ruta]+1
                }
                fs.writeFile(this.archivo, JSON.stringify(data), (err) =>{
                    if(err) return reject('no se puede guardar en el archivo de monitoreo')
                    return resolve(true)
                }); 
            } catch (error) {
                return reject('no se puede x2')
            }
        })
       
        
    }
    crearFile(){
        return new Promise((resolve,reject)=>{
            fs.appendFile(this.archivo, JSON.stringify({}), function (err) {
            if (err) return reject('un error con la ruta');
            return resolve('file de monitoreo creado')
          });
        } )
    }
    

}

module.exports = MonitorRutas;