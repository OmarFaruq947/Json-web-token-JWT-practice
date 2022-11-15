import React from "react";
import { useNavigate } from "react-router-dom";


const inputStyle={
  width:'100%',
  height: '30px',
  marginBottom: '10px',
}
const Login = () => {
const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;


    fetch('http://localhost:5000/login',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({email, password})
    })
    .then(res => res.json())
    .then(data =>{
      if(data.success){
        localStorage.setItem('accessToken', data.accessToken)
        navigate('/orders')
      }
      console.log(data);
    })

  };

  return (
    <div>
      <br />
      <br />
      <br />
      <form onSubmit={submitHandler} style={{width:'30%', margin:'20px auto'}}>
        <input style={inputStyle} type="email" placeholder="email" name="email" />
        <input style={inputStyle} type="password" placeholder="password" name="password" />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
