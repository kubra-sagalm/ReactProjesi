// HomePage.js
import React, { useContext, useState } from "react";
import {
  Calendar as AntCalendar,
  Modal,
  Form,
  Input,
  Button,
  Card,
} from "antd";
import moment from "moment";

import { TaskContext } from "./TaskContext";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const { tasks, addTask } = useContext(TaskContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (date) => {
    setSelectedDate(date.format("YYYY-MM-DD"));
    setModalVisible(true); //yeni iş eklerken modalı görünür yapmamı sağladı.
  };

  const handleAddTask = (values) => {
    const newEvent = {
      id: tasks.length + 1,
      title: values.title,
      date: selectedDate,
      dueDate: selectedDate,
    };

    addTask(newEvent);
    setModalVisible(false);
  };

  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const filteredTasks = tasks.filter((task) => task.date === formattedDate);

    return (
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card style={{ width: "80%", margin: "50px auto", padding: "20px" }}>
      <h2>Takvim
      </h2>
      <AntCalendar onSelect={handleSelect} dateCellRender={dateCellRender} />

      <Modal
        title={`Yeni iş ekle - ${selectedDate}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form name="add_task_form" onFinish={handleAddTask}>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Lütfen iş adını girin!" }]}
          >
            <Input placeholder="İş adı" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default HomePage;
