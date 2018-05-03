'use strict'


//::::::::::::::::::::::::::::::::::::::::: HTTP PUT ::::::::::::::::::::::::::::::::::::::
function GetUsers(req, res){
    if(req.method == 'GET')
    {
        admin.database().ref('dbTest/user').once('value').then((snapshot)=>{
            if(!snapshot){
                res.status(404).send({mensaje: 'No existen usuarios registrados'});
            }
            if(snapshot.val().length <= 0){
                res.status(404).send({mensaje: 'No existen usuarios registrados.'});
            }
            else{
                console.log(snapshot);
                // for (let value of snapshot) {
                //     Console.log(value.val());
                // }
                res.status(200).send({usuarios: snapshot});
            }
        }).catch((err)=> {
            console.log(`Error al obtener usuarios. ${err}`);
        });
    }
    else{
        return res.status(403).send('Forbidden!');
    }
}
//::::::::::::::::::::::::::::::::::::::::: HTTP POST ::::::::::::::::::::::::::::::::::::::
//Método de creación de usuario
function CreateUser(req, res){
    if (req.method == 'POST') {
        const newAge = req.body.age;
        const newName = req.body.fullname;
        const newUsername = req.body.username;

        admin.database().ref('dbTest/user').push({
            age: newAge,
            name: newName,
            username: newUsername
        }).then(response =>{
            console.log('Usuario registrado en la base de datos correctamente.');
            console.log(response);
        }).catch((err)=>{
            console.log(`Error ${err}, al insertar el usuario: ${err}`);
        });
        return res.status(200).send('Usuario creado satisfactoriamente.');
    }
    else{
        return res.status(403).send('Forbidden!');
    }
}

//::::::::::::::::::::::::::::::::::::::::: HTTP PUT ::::::::::::::::::::::::::::::::::::::
//Método de actualización de usuario
function UpdateUser(req, res){
    if(req.method == 'PUT')
    {
        const userId = req.query.id;
        console.log(`id de usuario: ${userId}`);
        console.log(`params: ${req.params}`);
        console.log(`id param: ${req.userId}`);
        const newAge = req.body.age;
        const newName = req.body.fullname;
        const newUsername = req.body.username;
        
        admin.database().ref(`dbTest/user/${userId}`).set({
            age: newAge,
            name: newName,
            username: newUsername
        }).then(result =>{
            console.log(`Usuario ${newName} actualizado correctamente.`);
        }).catch((err)=>{
            console.log(`Error ${err}, al insertar el usuario: ${newName}`);
        });
        res.status(200).send({ message: `Usuario ${newName} actualizado correctamente.`, data: result});
    }
    else{
        return res.status(403).send({message: 'Forbidden!'});
    }
}


//Exports the functionalities
module.exports={
    GetUsers,
    CreateUser,
    UpdateUser
}