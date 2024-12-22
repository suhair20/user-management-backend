import asynchandler from 'express-async-handler'
import User from '../Models/userModel.js'
import generateToken from '../utils/generateToken.js'
import QRCode from 'qrcode';

//@dec Auth user/set token
//route post /api/users/auth
//@acces public

const authUser=asynchandler(async(req,res)=>{ 
      const {email,Password,qrCode}=req.body
     

      if(email&&Password){

          const user=await User.findOne({email})
               if(user && (await user.matchPassword(Password))){
                       generateToken(res,user._id);
   
                         res.status(201).json({
                               _id:user._id,
                              name:user.name,
                             email:user.email
                                       })
              }else{
                 res.status(400)
                  throw new Error('Invalid user datas')
                    }
    }
      else if(qrCode){
        console.log(qrCode);
        
        const user = await User.findOne({  qrCode }); // Assume `qrData` contains email or identifier

        if (user) {
          generateToken(res, user._id);
    
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
          });
        } else {
          res.status(400);
          throw new Error('Invalid QR code data or user not found');
        }
      }
      // If neither, return an error
      else {
        res.status(400);
        throw new Error('Please provide email/password or QR code data');
      }        




})


//@dec register.user/set token
//route post /api/users/auth
//@acces public

const RegisterUser=asynchandler(async(req,res)=>{ 
    console.log('helooo')
    const {name,email,Password}=req.body
    console.log(name);

    const existUser=await User.findOne({email:email}) 
    console.log(email);

    if(existUser){
        res.status(401)
        throw new Error("User already Exist")
    }

    const user =await User.create({
        name,
        email,
        Password
    })
    console.log("vannuu");

   if(user){
    console.log("user:",user);
    const qrCode =user._id.toString();
    generateToken(res,user._id);
    const qrCodeImage = await QRCode.toDataURL(qrCode);

    user.qrCode=qrCode
     await user.save()
     console.log('win');
     
    
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        qrCodeImage
    })
   }else{
    res.status(400)
    console.log(Error);
    
    
    throw new Error('Invalid user data')
   }

    
   
})

//@dec Logout  user/set token
//route post /api/users/logout
//@acces public

const LogoutUser=asynchandler(async(req,res)=>{ 

    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'Loged out'})
})



  //@dec   GetuserProfile
 //route Get  /api/users/Profile
//@acces private

const GetUserProfile=asynchandler(async(req,res)=>{ 
    res.status(200).json({message:'GeteUser Profile'})
})



  //@dec Update userProfile
 //route Put  /api/users/Profile
//@acces private

const UpdateUserProfile=asynchandler(async(req,res)=>{ 

    const user =await User.findById(req.user._id)

    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email


        if(req.body.Password){
            user.Password= req.body.Password
        }
        const updatedUser=await user.save()
       res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email

       })

    }else{

        res.status(404)
        throw new Error('user not found')

    }

})

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const adminGet =asynchandler(async(req,res)=>{
    try{
        console.log("admin");
    const users=await User.find({})
    res.json(users)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

const loginwithqrcode= asynchandler(async(req,res)=>{
    const {qrCode}=req.body;
    const user= await User.find({qrCode})

    if(user){
        generateToken(res,user._id)
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email

        })
    }
    else{
        res.status(401);
        throw new Error('Invalid qr Code ')
    }
})





export {authUser,
     RegisterUser,
     LogoutUser,
     UpdateUserProfile,
     GetUserProfile,
     adminGet,
     loginwithqrcode
     
};