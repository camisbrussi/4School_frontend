import React from 'react';
import AdminPanelHeader from './AdminPanelHeader';
import {Routes, Route} from 'react-router-dom';
import Feed from '../Feed/Feed';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

import Users from '../User/Users';
import UserCreate from '../User/UserCreate'
import UserEdit from '../User/UserEdit'
import UserDelete from '../User/UserDelete'

import Activities from '../Activity/Activities';
import ActivityCreate from '../Activity/ActivityCreate';
import ActivityEdit from '../Activity/ActivityEdit';
import ActivityDelete from '../Activity/ActivityDelete';

import Teachers from '../Teacher/Teachers';
import TeacherCreate from '../Teacher/TeacherCreate';
import TeacherEdit from '../Teacher/TeacherEdit';
import TeacherDelete from '../Teacher/TeacherDelete';

import Teams from '../Team/Teams';
import TeamCreate from '../Team/TeamCreate';
import TeamEdit from '../Team/TeamEdit';
import TeamDelete from '../Team/TeamDelete';

import styles from './AdminPanel.module.css';

const AdminPanel = () => {
    return (
        <section className={`${styles.panel} container`}>
            <Head title="Painel Administrador"/>
            <AdminPanelHeader/>

            <div className={styles.forms}>
                <Routes>
                    <Route path="/" element={<Feed/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/users/createuser" element={<UserCreate/>}/>
                    <Route path="/users/edit/:id" element={<UserEdit/>}/>
                    <Route path="/users/delete/:id" element={<UserDelete/>}/>

                    <Route path="/activities" element={<Activities/>}/>
                    <Route path="/activities/createactivity" element={<ActivityCreate/>}/>
                    <Route path="/activities/delete/:id" element={<ActivityDelete/>}/>
                    <Route path="/activities/edit/:id" element={<ActivityEdit/>}/>
                    <Route path="/activities" element={<Activities/>}/>

                    <Route path="/teachers" element={<Teachers/>}/>
                    <Route path="/teachers/createteacher" element={<TeacherCreate/>}/>
                    <Route path="/teachers/delete/:id" element={<TeacherDelete/>}/>
                    <Route path="/teachers/edit/:id" element={<TeacherEdit/>}/>

                    <Route path="/teams" element={<Teams/>}/>
                    <Route path="/teams/createteam" element={<TeamCreate/>}/>
                    <Route path="/teams/delete/:id" element={<TeamDelete/>}/>
                    <Route path="/teams/edit/:id" element={<TeamEdit/>}/>

                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </section>
    );
};

export default AdminPanel;