import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input } from 'antd';
const CryptoJS = require("crypto-js");




const Home = () => {
  const [ipAddress, setApiAddress] = useState("");
  const [form] = Form.useForm();



  const onFinish = async (values) => {
    const {email,password,username}=values
    let string = password.replace(/\s+/g, '');
    let hash = CryptoJS.MD5(string).toString();
     
    const data = {email:email,username: username ,password:hash,ipAdd:ipAddress?ipAddress:""};
    const res = await axios.post("http://localhost:8443/user",data);
    form.resetFields();
    alert("data saved successfully")
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  
 


  const getIpAddress = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setApiAddress(res.data.IPv4);
 };

  useEffect(() => {
    getIpAddress();
  }, []);

  return (
    <div className="form-container"> 
      <div className="formmain">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
      <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </div>
    </div>

  );
};

export default Home;
