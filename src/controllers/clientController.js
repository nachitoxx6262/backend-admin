const { Client,Empresa } = require("../db.js");
const axios = require("axios");
const { Op, DataTypes } = require("sequelize");
  // #################🚨 GET  🚨    ####################
  const getClient = async (name) => {
      let clients = await Client.findAll({
        include: [{ model: Empresa, attributes: ['name'],through: {attributes:[]} }]
      });;

      const clientsFormatted = clients.map((client) => {
        const empresas = client.Empresas.map((empresa) => empresa.name);
        return { 
          ...client.toJSON(), 
          Empresa: empresas.join(', ') || null 
        };
      });
    
      return clientsFormatted;
  };
  // #################🚨 CREATE Clientes 🚨    ####################
  const createClient = async (name,gender,dni,birthdate,tel,adress,visit,blacklist,email,company,description) => {
    try {
      const clienteExistente = await Client.findOne({ where: { dni } });
      if (clienteExistente) {
        const clienteEnBlacklist = clienteExistente.dataValues.blacklist
        if (clienteEnBlacklist == "✅") {
          return({message : `El cliente con DNI ${dni} se encuentra en la lista negra.`, alert: true});
        }else{
          const nuevaVisita = clienteExistente.visit+" " + visit;
          await Client.update({ visit: nuevaVisita }, { where: { dni } });
          return ({message: `Cliente actualizado: ${clienteExistente.name}, visita: ${visit}`, alert: false});
          
        }
      } else {
        const cliente = await Client.create({name,gender,dni,birthdate,tel,adress,visit,blacklist,email,description});
        if (company) {
          const empresa = await Empresa.findOne({ where: { name: company.toUpperCase() } });
  
          if (empresa) {
            await cliente.addEmpresa(empresa);
            return ({message: `Cliente creado: ${cliente.name} asociado a la empresa ${empresa.name}`, alert: false})
          } else {
            return ({message:`No se encontró la empresa con nombre ${company}`, alert: true});
          }
        } else {
          const client = await cliente.addEmpresa("FAMILIA");
          return ({message: `Cliente creado sin empresa asignada: ${cliente.name}`});
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
  // #################🚨 GET Clientes by DNI 🚨    ####################
  const getClientByDni = async (dni) => {
        let result = await Client.findAll({
          where: { dni: dni },
        });
        if (result) return result[0];
        else {
          {
            throw new Error("Id not found");
          }
        }
    }
// #################🚨 GET Clientes by DNI 🚨    ####################
 const actualizarPersonaPorDNI= async(id, datos)=> {
      let {name,dni,sexo,fechanac,visitas,email,direccion,blacklist,tel} = datos
      try {
        // Busca la persona por ID
        const persona = await Client.findOne({
          where: {
            id: id
          }
        });
        if (!persona) {
          // Si no existe la persona, lanza una excepción
          throw new Error('No se encontró ninguna persona con ese DNI.');
        }
        // Actualiza los datos de la persona
        await persona.update({name,dni,sexo,fechanac,visitas,email,direccion,blacklist,tel});
    
        return persona;
      } catch (error) {
        console.error(error);
      }
    }
    const deleteClient =async(id)=>{
      try {
        const result = await Client.destroy({
          where: {
            id: id // el id del registro que se desea eliminar
          }
        });
        if (result === 0) {
          throw new Error(`No se encontró ningún usuario con id ${id}`);
        }
        console.log(`Usuario con id ${id} eliminado exitosamente`);
      } catch (error) {
        console.log('Error al eliminar el usuario:', error);
      }
    }
  
    
    
    

module.exports = {getClient,createClient,getClientByDni,actualizarPersonaPorDNI,deleteClient};