import React from 'react';
import {useSelector} from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom';

import {ProtectedRoute} from './routes/ProtectedRoute';

import {ClassAttendance} from './pages/ClassAttendance';
import {ClassDebts} from './pages/ClassDebts';
import {Login} from './pages/Login';
import {Profile} from './pages/Profile';
import {Statistic} from './pages/Statistic';
import {StudentsSchedule} from './pages/Schedule/StudentsSchedule';
import {TeacherSchedule} from './pages/Schedule/TeacherSchedule';
import {UserManual} from './pages/UserManual';
import {MainLayout} from "./layouts/MainLayout";

export const App = () => {
  const isAuthorized = useSelector((state) => state.auth.success);
  const userRoles = useSelector((state) => state.auth.roles);

  console.log(userRoles);



  return (
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route element={<ProtectedRoute isAuthorized={isAuthorized} userRoles={userRoles}/>}>
        <Route element={<MainLayout/>}>z
          <Route path="/" element={<Profile/>}/>
          <Route path="/schedule" element={<StudentsSchedule/>}/>
          <Route path="/schedule/teacher/:teacherName" element={<TeacherSchedule/>}/>
          <Route path="/statistic" element={<Statistic/>}/>
          <Route path="/attendance" element={<ClassAttendance/>}/>
          <Route path="/debts" element={<ClassDebts/>}/>
          <Route path="/manual" element={<UserManual/>}/>
          <Route path="*" element={<Navigate to="/" replace={true}/>}/>
        </Route>
      </Route>
    </Routes>
  );
}
