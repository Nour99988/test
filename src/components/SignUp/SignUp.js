import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import style from "./SignUp.module.css";

export default function SignUp(){
    const [formError,setFormError] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [data, setData] = useState({
        username : '',
        // email : '',
        password :'',
        confirmPassword :'',
    });
    const handleSubmet = (e) =>{
        // console.log(e);
        const {name , value} = e.target;
        setData((prev)=> ({...prev, [name] : value}))
    }
    const handleSubmition = (e) =>{
        e.preventDefault();
        setFormError(validation(data));
        setIsSubmit(true);
    }
    useEffect(()=>{
        if(Object.keys(formError).length === 0 && isSubmit){
            console.log(data);
            sendData();
        }
    },[formError])
    const validation = (value) =>{
        const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const errors = {};
        console.log(data.username.length);
        if(!value.username){
            errors.username ="username is required !!";
        } else if(value.username.length < 3){
            errors.username ="username is must be more 4 characters !!";
        }
        // if(!value.email){
        //     errors.email ="email is required !!";
        // } else if(!regx.test(value.email)){
        //     errors.email ="This is not a valid email format !";
        // }
        if(!value.password){
            errors.password ="password is required !!";
        }else if(value.password.length < 5){
            errors.password ="Password must be more then 4 characters";
        }else if(value.password.length > 11){
            errors.password ="Password cannot exceed more then 10 characters";
        }
        if(!value.confirmPassword){
            errors.confirmPassword ="confirm password is required !!";
        }else if(value.confirmPassword.length < 6){
            errors.confirmPassword ="confirm Password must be more then 4 characters";
        }else if(value.confirmPassword.length > 11){
            errors.confirmPassword ="confirm Password cannot exceed more then 10 characters";
        }
        return errors;
    }
    const sendData = async() => {
        let body = {
            username : data.username,
            password : data.password,
            confirmPassword : data.confirmPassword,
        }
        await axios.post("https://focalx-certgenerator.herokuapp.com/v1/auth/register",body).then((res)=>{
            console.log("bla",res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <>
            <form noValidate onSubmit={handleSubmition}>
                <div className={style.Login}>
                    <div className={style.card}>
                   <div>
                   <label className="mt-3">Username</label>
                    <input type="text" name="username" value={data.username} onChange={(e)=>handleSubmet(e)} required/>
                   </div>
                   <span className={style.spans}>{formError.username}</span>
                   <div>
                   {/* <label>Email</label>
                    <input type="email" name="email" value={data.email} onChange={(e)=>handleSubmet(e)} required/>
                   </div>
                   <span className={style.spans}>{formError.email}</span>
                    <div> */}
                    <label>Password</label>
                    <input type="password" name="password" value={data.password} onChange={(e)=>handleSubmet(e)}/>
                    <span className={style.spans}>{formError.password}</span>
                    </div>
                    <div>
                    <label>Confirm Password</label>
                    <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={(e)=>handleSubmet(e)}/>
                    <span className={style.spans}>{formError.confirmPassword}</span>
                    </div>
                    <input  type="submit" className={style.button} value="Sign Up"/>
                    </div>
                    </div>
            </form>
        </>
    )
}