import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import LoginForm from "./Login/Login";
import {client} from "../apis";

const App = () => (
    <ApolloProvider client={client}>
        <LoginForm />
    </ApolloProvider>
);

export default App;
