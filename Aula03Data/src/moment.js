const moment = require('moment');

function verificarData(dataEntrada){
    //verificar o tipo de dado da data
    if(typeof dataEntrada !=='string') return mull;

    //validar a data no formato brasileiro
    const dataBR = moment(dataEntrada, 'DD/MM/YYYY', true);
    if(dataBR.isValid()){
        return dataBR.format('YYYY-MM-DD');
    }

    //Validar se a data já se encontra no formato americano correto para ser salvo
    //no banco de dados
    const dataUSA = moment(dataEntrada, 'DD/MM/YYYY', true);
    if(dataUSA.isValid()){
        return dataUSA;
    }

    return null;
}

module.exports = verificarData;