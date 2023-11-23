import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavigationButton } from '../NavigationButton';

import { persistor } from '../../store';
import { logoutUser } from '../../store/authSlice';
import { clearStudentInfo } from '../../store/studentSlice';
import { clearSchedule } from '../../store/scheduleSlice';
import { clearWeekData } from '../../store/weekDataSlice';

import userIcon from '../../assets/images/buttonIcons/User.svg';
import calendarIcon from '../../assets/images/buttonIcons/Calendar.svg';
import statisticIcon from '../../assets/images/buttonIcons/Chart.svg';
import attendanceIcon from '../../assets/images/buttonIcons/Component.svg';
import debtsIcon from '../../assets/images/buttonIcons/Receipt.svg';
import userManualIcon from '../../assets/images/buttonIcons/InfoSquare.svg';
import logoutIcon from '../../assets/images/buttonIcons/Logout.svg';
import personIcon from '../../assets/images/vector.svg';
import { fetchWeekDay,fetchWeekNumber,fetchWeekName } from '../../store/weekDataSlice';
import { fetchStudentsSchedule } from '../../store/scheduleSlice';

import './style.css';

export const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const studentGroup = useSelector((state)=>state.student.studentInfo);
  const userToken=useSelector((state)=>state.auth.userToken);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearStudentInfo());
    dispatch(clearSchedule());
    dispatch(clearWeekData());
    persistor.purge();
    navigate("/login");
  };


  const handleScheduleInfo=()=>{
    dispatch(fetchStudentsSchedule(studentGroup.group.name));
    dispatch(fetchWeekDay(userToken));
    dispatch(fetchWeekNumber());
    dispatch(fetchWeekName());
  }
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-title-block">
          <img className="sidebar-logo" src={personIcon} alt="Person icon"/>
          <p>
            Личный кабинет студента<br /> УО "ВГТУ"
          </p>
        </div>
        <NavigationButton to="/" icon={userIcon} text="Мой профиль" isActive={location.pathname === '/'}/>
        {/* <NavigationButton to="/schedule" icon={calendarIcon} text="Расписание"
                          isActive={location.pathname === '/schedule'}/> */}
        <NavigationButton to="/statistic" icon={statisticIcon} text="Статистика"
                          isActive={location.pathname === '/statistic'}/>
        <NavigationButton to="/attendance" icon={attendanceIcon} text="Посещения занятий"
                          isActive={location.pathname === '/attendance'}/>
        <NavigationButton to="/debts" icon={debtsIcon} text="Задолжности" isActive={location.pathname === '/debts'}/>
        <div className="dividing_line"></div>
        <NavigationButton to="/manual" icon={userManualIcon} text="Руководство пользователя"
                          isActive={location.pathname === '/manual'}/>
                         
        <button onClick={handleScheduleInfo} className="sidebar-button">
          <Link to="/schedule" >
            <div className="button-content">
              <img src={logoutIcon} alt="Button icon" className="button_icon"/>
              <span className="button_text">Расписание</span>
            </div>
          </Link>
        </button>
      
        <button onClick={handleLogout} className="sidebar-button">
          <div className="button-content">
            <img src={logoutIcon} alt="Button icon" className="button_icon"/>
            <span className="button_text">Выйти из профиля</span>
          </div>
        </button>
      </div>
    </>
  );
};
