import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Table } from '../ScheduleComponents/Table';
import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';

import teacherImg from '../../../assets/images/avatar.svg';
import './style.css';

export const TeacherSchedule = () => {
  const {teacherName} = useParams();

  const scheduleArray = useSelector((state) => state.schedule.teacherScheduleData);

  const currentWeekDay = useSelector((state) => state.weekNumber.weekNumber);
  const currentWeekNumber = useSelector((state) => state.weekNumber.weekNumber);
  const currentWeekName = useSelector((state) => state.weekName.weekName);

  return (
    <>
      <div className="teacher-information-block">
        <img className="teacher-block-img" src={teacherImg} alt="Teacher img"/>
        <div>
          <p>{teacherName}</p>
        </div>
      </div>
      <ScheduleSelectors />
      <Table
        weekDay={currentWeekDay}
        weekNumber={currentWeekNumber}
        weekName={currentWeekName}
        scheduleData={scheduleArray}
        isTeacherSchedule={true}
      />
    </>
  );
};
