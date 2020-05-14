import React from "react";
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const LoginForm = () => {

    const LOGIN = gql`
      mutation TokenAuth($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
            payload
            refreshExpiresIn
         }
      }
    `;

    const REFRESH_TOKEN = gql`
      mutation RefreshToken($token: String!) {
        refreshToken(token: $token) {
            token
            payload
            refreshExpiresIn
         }
      }
    `;

    const [Login] = useMutation(LOGIN);
    const [refreshToken] = useMutation(REFRESH_TOKEN)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: ({username, password}) => {
            Login({ variables: { username:"admin",  password:"admin"}})
                .then(async ({data:{tokenAuth}})=>{
                    console.log(tokenAuth)
                    const response = await refreshToken({variables:{token: tokenAuth.token}})
                    console.log(response)
                })
                .catch((error) => {console.log(JSON.stringify(error))})
            /*refreshToken*/
        }
    })

    const { handleSubmit, handleChange, values: { username , password } } = formik

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">User</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
                value={username}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={password}
            />
            <button className={'btn btn-primary'} type="submit">Submit</button>
        </form>
    )
}

export default LoginForm;