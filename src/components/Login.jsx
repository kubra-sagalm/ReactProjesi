import React from "react";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";
import { auth } from "../firebase"; // Firebase auth modülünü import ediyoruz

const { Link } = Typography;


const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      console.log("User logged in");
      navigate("/todo");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const navi = () => {
    navigate("/register");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card style={{ width: 400, margin: "100px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Typography.Title
          level={3}
          style={{ marginBottom: 0, color: "rgba(150, 112, 219, 0.8)" }}
        >
          Planner
        </Typography.Title>
      </div>
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Lütfen e-posta adresinizi girin!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="E-posta" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Beni hatırla</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              background: "rgba(147, 112, 219, 0.8)",
              color: "white",
              borderColor: "rgba(147, 112, 219, 0.8)",
              width: "100%",
            }}
          >
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button onClick={navi}>Hesabın yok mu? Kayıt Ol</Button>
      </div>
    </Card>
  );
};

export default Login;
