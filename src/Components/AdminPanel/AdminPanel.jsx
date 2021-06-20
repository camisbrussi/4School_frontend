import React, { useState, useEffect } from 'react';
import AdminPanelHeader from './AdminPanelHeader';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import NotFound from '../NotFound';
import Head from '../Helper/Head';
import Header from '../Header';

import Feed from '../Feed/Feed'
import ServiceQueue from '../Chat/ServiceQueue'
import ChatUser from '../Chat/ChatUser';
import ChatAdmin from '../Chat/ChatAdmin'

import Users from '../User/Users';
import UserCreate from '../User/UserCreate';
import UserEdit from '../User/UserEdit';

import Activities from '../Activity/Activities';
import ActivityCreate from '../Activity/ActivityCreate';
import ActivityEdit from '../Activity/ActivityEdit';
import ActivityParticipants from '../Activity/ActivityParticipants';
import ActivityAddParticipants from '../Activity/ActivityAddParticipants';
import ActivityView from '../Activity/ActivityView';

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
import TeamStudentsAdd from '../Team/TeamStudentsAdd';
import TeamsTeacher from '../Team/TeamsTeacher';
import TeamParticipants from '../Team/TeamParticipants';

import Error from '../Logs/Errors';
import ErrorShow from '../Logs/ErrorShow';
import Info from '../Logs/Infos';
import InfoShow from '../Logs/InfoShow';

import SendMail from '../SendMail/SendMail';
import SendMailCreate from '../SendMail/SendMailCreate';
import SendMailCreateResponsible from '../SendMail/SendMailCreateResponsible';

import styles from './AdminPanel.module.css';

const AdminPanel = () => {
const { userLogged } = React.useContext(UserContext);
  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(userLogged);
  }, [userLogged]);

  return (
    <>
      <section className={`${styles.panel} container`}>
        <Head title="Painel Administrador" />
        <AdminPanelHeader />
        <Header />
        <div className={styles.forms}>
          <Routes>
            {user.type_id ? <Route path="/" element={<Feed />} /> : <Route path="/" element={<ServiceQueue />} />};
            <Route path="/users" element={<Users />} />
            <Route path="/users/createuser" element={<UserCreate />} />
            <Route path="/users/edit/:id" element={<UserEdit />} />
            <Route path="/activities" element={<Activities />} />
            <Route
              path="/activities/createactivity"
              element={<ActivityCreate />}
            />
            <Route path="/activities/edit/:id" element={<ActivityEdit />} />
            <Route
              path="/activities/participants"
              element={<ActivityParticipants />}
            />
            {/*<Route path="/activities/participants/activityaddteacher" element={<ActivityAddTeacher/>}/>*/}
            <Route
              path="/activities/participants/activityaddparticipants"
              element={<ActivityAddParticipants />}
            />
            <Route path="/activities/view/:id" element={<ActivityView />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/teachers/createteacher" element={<TeacherCreate />} />
            <Route path="/teachers/edit/:id" element={<TeacherEdit />} />
            <Route path="/responsibles" element={<Responsibles />} />
            <Route
              path="/responsibles/createresponsible"
              element={<ResponsibleCreate />}
            />
            <Route
              path="/responsibles/edit/:id"
              element={<ResponsibleEdit />}
            />
            <Route path="/students" element={<Students />} />
            <Route path="/students/createstudent" element={<StudentCreate />} />
            <Route path="/students/edit/:id" element={<StudentEdit />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/createteam" element={<TeamCreate />} />
            <Route path="/teams/edit/:id" element={<TeamEdit />} />
            <Route path="/teams/participants" element={<TeamParticipants />} />
            <Route
              path="/teams/participants/addstudents"
              element={<TeamStudentsAdd />}
            />
            <Route path="/teams/teacher" element={<TeamsTeacher />} />
            <Route path='/chat' element={<ChatUser />} />
            <Route path='/chat/attendance/:id' element={<ChatAdmin />} />

            <Route path="/errors" element={<Error />} />
            <Route path="/errors/:arquivo" element={<ErrorShow />} />
            <Route path="/infos" element={<Info />} />
            <Route path="/infos/:arquivo" element={<InfoShow />} />
            <Route path="/sendMail" element={<SendMail />} />
            <Route path="/sendMail/createsendMail" element={<SendMailCreate />} />
            <Route path="/sendMail/createsendMailResponsible" element={<SendMailCreateResponsible />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </section>
    </>
  );
};

export default AdminPanel;
