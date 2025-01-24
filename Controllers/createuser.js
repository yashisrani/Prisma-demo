const prisma = require('../DB/db.config')

const createuser = async(req,res)=>{
    try {
    const {name,email,password} = req.body
    const newuser = await prisma.user.create({
        data:{
            name,
            email,
            password
        }
    })
    res.status(200).json({
        message: "User created successfully",
        user: newuser
    })
    } catch (error) {
        console.log("Error creating user");
        
    }
}


// update user
const updateuser = async(req,res)=>{
  try {
    const {id} = req.params;
    const {name,email,password} = req.body
    const updatedUser = await prisma.user.update({
        where:{
            id: Number(id) // because id is string, so we want to convert string to number
        },
        data:{
            name,
            email,
            password
        }
    })
    res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
    })
  } catch (error) {
    console.log("error updating user");
  }
}
 

// delete user
const deleteuser = async(req,res)=>{
    try {
        const userId = req.params.id;
        await prisma.user.delete({
         where: {
              id: Number(userId),
           },
        });
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = deleteuser


// get user by id
const getUserById = async(req,res)=>{
    try {
        const userId = req.params.id;
        const user = await prisma.user.findFirst({
            where: {
              id: Number(userId),
            },
        });
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
        
    }
}

const getUser = async(req,res)=>{
    try {
        const user = await prisma.user.findMany({});
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getUser, getUserById, updateuser, createuser}