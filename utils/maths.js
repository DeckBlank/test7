'use strict'
module.exports = {
    getRandomRange : (min, max)=>{
        return Math.random() * (max - min) + min;
    }
}