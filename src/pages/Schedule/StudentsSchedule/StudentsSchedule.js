import React, { useEffect } from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { useDispatch, useSelector } from 'react-redux';

import { fetchWeekName, fetchWeekNumber, getWeekDay, getWeekName, getWeekNumber } from '../../../store/weekDataSlice';
import { fetchStudentsSchedule, getStudentSchedule } from '../../../store/scheduleSlice';
import { it10arr, weekDay, weekName, weekNumber } from '../../../assets/utils/it10';

import { ScheduleSelectors } from '../ScheduleComponents/ScheduleSelectors';
import { Table } from '../ScheduleComponents/Table';
import { Spinner } from '../../../components/Spinner';
import { ErrorMessage } from '../../../components/Error/ErrorMessage';

export const StudentsSchedule = () => {
  const dispatch = useDispatch();

  const studentsSchedule = useSelector((state) => state.schedule.studentsScheduleData);
  const currentWeekDay = useSelector((state) => state.weekData.weekDay);
  const currentWeekNumber = useSelector((state) => state.weekData.weekNumber);
  const currentWeekName = useSelector((state) => state.weekData.weekName);

  const {studentsScheduleStatus, studentsScheduleData, studentsScheduleError} = useSelector((state) => state.schedule);

  useEffect(() => {
     //dispatch(fetchStudentsSchedule("ИТ-10"));
    // dispatch(fetchWeekNumber());
    // dispatch(fetchWeekName());
    dispatch(getStudentSchedule(it10arr));
    dispatch(getWeekName(weekName));
    dispatch(getWeekNumber(weekNumber));
    dispatch(getWeekDay(weekDay))
  }, [dispatch]);

  return (
    <MainLayout>
      {studentsScheduleStatus === 'loading' && <Spinner type="points" text="Идёт загрузка"/>}
      {studentsScheduleError && <ErrorMessage error={studentsScheduleError}/>}
      {studentsScheduleStatus !== 'loading' && !studentsScheduleError && (
        <>
          <ScheduleSelectors />
          <Table
            weekDay={currentWeekDay}
            weekName={currentWeekName}
            weekNumber={currentWeekNumber}
            scheduleData={studentsSchedule}
            isTeacherSchedule={false}
          />
        </>
      )}
    </MainLayout>
  );
};
