import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 

const { Title } = Typography;


const ProfileCreation = () => {
  const navigate = useNavigate();
  const auth = getAuth(); 

  const onFinish = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      console.log('User registered:', userCredential.user.uid);
      navigate('/todo');
    } catch (error) {
      console.error('Error registering:', error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const redirectToLogin = () => {
    navigate('/login');
  };



  return (
    <Card style={{ width: 400, margin: '100px auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Title level={3} style={{ marginBottom: 0, color: 'rgba(150, 112, 219, 0.8)' }}>
          Profil Oluşturma
        </Title>
      </div>
      <Form
        name="profile_creation_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-posta" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Kullanıcı Adı" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ background: 'rgba(147, 112, 219, 0.8)', color: 'white', borderColor: 'rgba(147, 112, 219, 0.8)', width: '100%' }}
          >
            Kayıt Et
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button 
          type="link"
          onClick={redirectToLogin}
          style={{ padding: 0 }}
        >
          Login Sayfasına Dön
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCreation;
