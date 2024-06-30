import React, { useState, useContext } from 'react';
import { Button, Card, DatePicker, Input, List, message, Dropdown, Menu, Checkbox, TimePicker } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from './TaskContext';


const { RangePicker } = DatePicker; //başlangıç bitiş tarihi almak için kullanılır

const TodoList = () => {
  const { tasks, addTask, deleteTask } = useContext(TaskContext);
  const [newTask, setNewTask] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [repeatDays, setRepeatDays] = useState({
    Monday: { selected: false, time: null },
    Tuesday: { selected: false, time: null },
    Wednesday: { selected: false, time: null },
    Thursday: { selected: false, time: null },
    Friday: { selected: false, time: null },
    Saturday: { selected: false, time: null },
    Sunday: { selected: false, time: null },
  });
  const [isRoutine, setIsRoutine] = useState(false);

  const navigate = useNavigate();

  const handleAddTask = () => {
    if (newTask.trim() === '') {
      message.error('Lütfen görev adı giriniz.');
      return;
    }

    if (dateRange[0] && dateRange[0].isBefore(moment(), 'day')) {
      message.error('Başlangıç tarihi bugünden önce olamaz.');
      return;
    }

    const task = {
      title: newTask,
      date: dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      dueDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : '',
      repeatDays: Object.keys(repeatDays).filter(day => repeatDays[day].selected).map(day => ({
        day,
        time: repeatDays[day].time ? repeatDays[day].time.format('HH:mm') : null,
      })),
      isRoutine,
    };

    addTask(task);
    setNewTask('');
    setDateRange([]);
    setRepeatDays({
      Monday: { selected: false, time: null },
      Tuesday: { selected: false, time: null },
      Wednesday: { selected: false, time: null },
      Thursday: { selected: false, time: null },
      Friday: { selected: false, time: null },
      Saturday: { selected: false, time: null },
      Sunday: { selected: false, time: null },
    });
    setIsRoutine(false);
  };

  const handleToggleRepeatDay = (day) => {
    setRepeatDays(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], selected: !prevState[day].selected },
    }));
  };

  const handleTimeChange = (day, time) => {
    setRepeatDays(prevState => ({
      ...prevState,
      [day]: { ...prevState[day], time },
    }));
  };

  const handleLogout = () => {
    message.success('Başarıyla çıkış yaptınız!');
    navigate('/login');
  };

  const menu = (
    <Menu>
      {Object.keys(repeatDays).map(day => (
        <Menu.Item key={day}>
          <Checkbox
            checked={repeatDays[day].selected}
            onChange={() => handleToggleRepeatDay(day)}
            style={{ width: '100%', textAlign: 'left' }}
          >
            {day}
          </Checkbox>
          {repeatDays[day].selected && (
            <TimePicker
              value={repeatDays[day].time}
              onChange={(time) => handleTimeChange(day, time)}
              format="HH:mm"
              style={{ marginTop: '5px' }}
            />
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Card style={{ width: 600, margin: '50px auto', padding: '20px' }}>
      <h2 style={{ marginBottom: 0, color: 'rgba(150, 112, 219, 0.8)'}}>Yapılacak Listesi</h2>
      <Input placeholder="Yeni görev ekle" value={newTask} onChange={(e) => setNewTask(e.target.value)} style={{ marginBottom: '10px' }} />
      <RangePicker //tarih aralığı için
        style={{ marginBottom: '10px' }}
        format="YYYY-MM-DD"
        value={dateRange}
        onChange={(dates) => setDateRange(dates)}
        disabledDate={(current) => current && current < moment().startOf('day')}
      />
      <Checkbox
        checked={isRoutine}
        onChange={(e) => setIsRoutine(e.target.checked)}
        style={{ marginBottom: '10px' }}
      >
        Bu görev rutindir
      </Checkbox>
      <Button style={{ marginLeft: 8, background: 'rgba(147, 112, 219, 0.8)', color: 'white', borderColor: 'rgba(147, 112, 219, 0.8)' }} type="primary" onClick={handleAddTask}>Ekle</Button>
      <Button
        style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(147, 112, 219, 0.8)', color: 'white', borderColor: 'rgba(147, 112, 219, 0.8)' }}
        type="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Button
        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(147, 112, 219, 0.8)', color: 'white', borderColor: 'rgba(147, 112, 219, 0.8)' }}
        type="primary"
        onClick={() => navigate('/home')}
      >
        Takvimde planlama
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task, index) => (
          <List.Item
            actions={[
              task.isRoutine && (
                <Dropdown overlay={menu} trigger={['click']} key={`${task.title}-dropdown`}>
                  <Button style={{ marginLeft: 8, background: 'rgba(147, 112, 219, 0.8)', color: 'white', borderColor: 'rgba(147, 112, 219, 0.8)' }}>
                    Seçilen Günler ve Saatler
                  </Button>
                </Dropdown>
              ),
              <Button style={{color:'rgba(147, 112, 219, 0.8)'}} type="link" onClick={() => deleteTask(index)} key={`${task.title}-delete`}>Sil</Button>
            ].filter(Boolean)}
          >
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ flex: 1 }}>
                <List.Item.Meta
                  title={task.title}
                  description={`Veriliş Tarihi: ${task.date} | Son Teslim Tarihi: ${task.dueDate} ${task.isRoutine ? '| Rutin' : ''}`}
                />
                {task.isRoutine && task.repeatDays.map(({ day, time }) => (
                  <div key={day}>
                    {day}: {time || 'Saat belirtilmemiş'}
                  </div>
                ))}
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TodoList;
