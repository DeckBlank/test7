import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import { archivos, monitor, maths } from './utils';
const http = express();


const startDB = (archivo)=>{
    return new archivos(archivo)
}
const startMonitor = (archivo)=>{
    return new monitor(archivo)
}

const DB = startDB('./db/texto.txt')
const Monitor = startMonitor('./db/monitor.txt')


const monitoreo = async(req,res,next)=>{
    let key = req.url.replace('/','')
   
    try {
        let monitoreoGuardado = await Monitor.guardar(key)
        next();
    } catch (error) {
        
        //let monitoreoGuardado = await Monitor.guardar(key)
       console.log(error);
       res.redirect('/visitas')
    }
    
}

const PORT = process.env.PORT||8080
const server = http.listen(PORT,()=>{
    console.log(`Servidor iniciado en ${PORT}`);
})
http.get('/',(req,res)=>{
    res.json({hola:"mundo"})
})

http.get('/items',monitoreo,async (req,res)=>{
    let items  = JSON.parse(await DB.leer());
    let respuesta = {
        items,
        cantidad : items.length
    }
    res.json(respuesta)
})
http.get('/item-random',monitoreo,async(req,res)=>{
    try {
        let items  = JSON.parse(await DB.leer());
        let cantidad = items.length;
        let index = parseInt(maths.getRandomRange(0,cantidad))
        res.json({item:items[index]})
    } catch (error) {
        console.log(error);
        res.status(500);
    }
    
})

http.get('/visitas',async(req,res)=>{
    try {
        let visitas  = JSON.parse(await Monitor.leer());
        res.json({visitas})
    } catch (error) {
        console.log(error);
        await Monitor.crearFile()
        res.json('Se creo el archivo de monitoreo')
    }
    
    
})

