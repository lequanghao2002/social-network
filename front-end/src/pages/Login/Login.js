import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Col, Row, Form, Input } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import authService from '~/services/authService';
import AuthContext from '~/context/AuthContext/authContext';
import { setLocalStorage } from '~/utils/localStorage';

const cx = classNames.bind(styles);

function Login() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleLogin = async (response) => {
        const { credential } = response;
        try {
            // Gửi token lên backend để xác thực
            const res = await authService.googleLogin(credential);
            setLocalStorage('token', res);

            const user = jwtDecode(res);
            setUser(user);
        } catch (error) {}
    };

    return (
        <div className={cx('wrapper')}>
            <Row justify="center">
                <Col span={24}>
                    <div className={cx('login-container')}>
                        <h2 className={cx('title')}>Social Network</h2>
                        {/* <Form
                            name="login"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Username" className={cx('custom-input')} />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password placeholder="Password" className={cx('custom-input')} />
                            </Form.Item>

                            <Form.Item>
                                <Button>Login</Button>
                            </Form.Item>
                        </Form> */}

                        <div className={cx('social-login')}>
                            {/* <Button primary className={cx('facebook-btn')} onClick={handleFacebookLogin}>
                                <FontAwesomeIcon icon={faFacebookSquare} />
                                Log in with Facebook
                            </Button> */}
                            {/* <Button className={cx('google-btn')} onClick={handleGoogleLogin}>
                                <FontAwesomeIcon icon={faGoogle} />
                                Log in with Google
                            </Button> */}

                            <GoogleLogin
                                text="signin_with"
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            ></GoogleLogin>
                            {/* <Button className={cx('github-btn')} onClick={handleGithubLogin}>
                                <FontAwesomeIcon icon={faGithub} />
                                Log in with GitHub
                            </Button> */}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
