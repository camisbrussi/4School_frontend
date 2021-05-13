import React from 'react';
import AdminPanelHeader from './AdminPanelHeader';
import {Routes, Route} from 'react-router-dom';
import Feed from '../Feed/Feed';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

import Users from '../User/Users';
import UserCreate from '../User/UserCreate'
import UserEdit from '../User/UserEdit'

import Activities from '../Activity/Activities';
import ActivityCreate from '../Activity/ActivityCreate';
import ActivityEdit from '../Activity/ActivityEdit';
import ActivityParticipants from '../Activity/ActivityParticipants';
import ActivityAddTeacher from '../Activity/ActivityAddTeacher';
import ActivityAddParticipants from '../Activity/ActivityAddParticipants';

import Teachers from '../Teacher/Teachers';
import TeacherCreate from '../Teacher/TeacherCreate';
import TeacherEdit from '../Teacher/TeacherEdit';

import Responsibles from '../Responsible/Responsibles';
import ResponsibleCreate from '../Responsible/ResponsibleCreate';
import ResponsibleEdit from '../Responsible/ResponsibleEdit';

import Students from '../Student/Students';
import StudentCreate from '../Student/StudentCreate';
import StudentEdit from '../Student/StudentEdit';

import Teams from '../Team/Teams';
import TeamCreate from '../Team/TeamCreate';
import TeamEdit from '../Team/TeamEdit';
import TeamStudentsAdd from "../Team/TeamStudentsAdd";

import Error from '../Logs/Errors'
import ErrorShow from '../Logs/ErrorShow'
import Info from '../Logs/Infos'
import InfoShow from '../Logs/InfoShow'

import SendMail from '../SendMail/SendMail';
import SendMailCreate from '../SendMail/SendMailCreate';

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

                    <Route path="/activities" element={<Activities/>}/>
                    <Route path="/activities/createactivity" element={<ActivityCreate/>}/>
                    <Route path="/activities/edit/:id" element={<ActivityEdit/>}/>
                    <Route path="/activities/participants" element={<ActivityParticipants/>}/>
                    {/*<Route path="/activities/participants/activityaddteacher" element={<ActivityAddTeacher/>}/>*/}
                    <Route path="/activities/participants/activityaddparticipants" element={<ActivityAddParticipants/>}/>

                    <Route path="/teachers" element={<Teachers/>}/>
                    <Route path="/teachers/createteacher" element={<TeacherCreate/>}/>
                    <Route path="/teachers/edit/:id" element={<TeacherEdit/>}/>

                    <Route path="/responsibles" element={<Responsibles/>}/>
                    <Route path="/responsibles/createresponsible" element={<ResponsibleCreate/>}/>
                    <Route path="/responsibles/edit/:id" element={<ResponsibleEdit/>}/>

                    <Route path="/students" element={<Students/>}/>
                    <Route path="/students/createstudent" element={<StudentCreate/>}/>
                    <Route path="/students/edit/:id" element={<StudentEdit/>}/>

                    <Route path="/teams" element={<Teams/>}/>
                    <Route path="/teams/createteam" element={<TeamCreate/>}/>
                    <Route path="/teams/edit/:id" element={<TeamEdit/>}/>
                    <Route path="/teams/addstudents" element={<TeamStudentsAdd/>}/>

                    <Route path="/errors" element={<Error/>}/>
                    <Route path="/errors/:arquivo" element={<ErrorShow/>}/>
                    <Route path="/infos" element={<Info/>}/>
                    <Route path="/infos/:arquivo" element={<InfoShow/>}/>

                    <Route path="/sendMail" element={<SendMail/>}/>
                    <Route path="/sendMail/createsendMail" element={<SendMailCreate/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </section>
    );
};

export default AdminPanel;