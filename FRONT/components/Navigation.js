import React from 'react';
import { AppRegistry } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import Home from '../screens/Home';
import Emprunter from '../screens/Emprunter';
import Rendre from '../screens/Rendre'


const Navigation = () => {

    return (
        <NativeRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/emprunter' element={<Emprunter />} />
                <Route exact path='/rendre' element={<Rendre />}/>
            </Routes>
        </NativeRouter>
    );
};

export default Navigation;
AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp)