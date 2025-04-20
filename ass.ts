// StudentRegistrationSystem.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem } from '@/components/ui/select';

const StudentRegistrationSystem = () => {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [newCourseType, setNewCourseType] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [filterType, setFilterType] = useState('');

  // Handlers for Course Types
  const addCourseType = () => {
    if (newCourseType && !courseTypes.includes(newCourseType)) {
      setCourseTypes([...courseTypes, newCourseType]);
      setNewCourseType('');
    }
  };
  const updateCourseType = (index, newName) => {
    const updated = [...courseTypes];
    updated[index] = newName;
    setCourseTypes(updated);
  };
  const deleteCourseType = (index) => {
    setCourseTypes(courseTypes.filter((_, i) => i !== index));
  };

  // Handlers for Courses
  const addCourse = () => {
    if (newCourse && !courses.includes(newCourse)) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
    }
  };
  const updateCourse = (index, newName) => {
    const updated = [...courses];
    updated[index] = newName;
    setCourses(updated);
  };
  const deleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // Handlers for Offerings
  const addOffering = () => {
    if (selectedCourse && selectedCourseType) {
      const newOffering = `${selectedCourseType} - ${selectedCourse}`;
      if (!offerings.includes(newOffering)) {
        setOfferings([...offerings, newOffering]);
      }
    }
  };
  const updateOffering = (index, newCourse, newType) => {
    const updated = [...offerings];
    updated[index] = `${newType} - ${newCourse}`;
    setOfferings(updated);
  };
  const deleteOffering = (index) => {
    setOfferings(offerings.filter((_, i) => i !== index));
  };

  // Handlers for Student Registration
  const registerStudent = (offering, studentName) => {
    if (studentName) {
      setRegistrations([...registrations, { offering, studentName }]);
    }
  };
  const getStudentsForOffering = (offering) => {
    return registrations.filter((r) => r.offering === offering);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Student Registration System</h1>

      {/* Course Types */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Course Types</h2>
          <Input
            placeholder="New Course Type"
            value={newCourseType}
            onChange={(e) => setNewCourseType(e.target.value)}
          />
          <Button onClick={addCourseType}>Add</Button>
          <ul>
            {courseTypes.map((type, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <Input
                  value={type}
                  onChange={(e) => updateCourseType(idx, e.target.value)}
                />
                <Button onClick={() => deleteCourseType(idx)}>Delete</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Courses */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Courses</h2>
          <Input
            placeholder="New Course"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
          />
          <Button onClick={addCourse}>Add</Button>
          <ul>
            {courses.map((course, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <Input
                  value={course}
                  onChange={(e) => updateCourse(idx, e.target.value)}
                />
                <Button onClick={() => deleteCourse(idx)}>Delete</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Course Offerings */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Course Offerings</h2>
          <Select onValueChange={setSelectedCourseType}>
            {courseTypes.map((type, idx) => (
              <SelectItem key={idx} value={type}>{type}</SelectItem>
            ))}
          </Select>
          <Select onValueChange={setSelectedCourse}>
            {courses.map((course, idx) => (
              <SelectItem key={idx} value={course}>{course}</SelectItem>
            ))}
          </Select>
          <Button onClick={addOffering}>Add Offering</Button>
          <ul>
            {offerings
              .filter((off) => !filterType || off.startsWith(filterType))
              .map((offering, idx) => (
                <li key={idx} className="flex justify-between">
                  {offering}
                  <Button onClick={() => deleteOffering(idx)}>Delete</Button>
                </li>
              ))}
          </ul>
          <Select onValueChange={setFilterType}>
            <SelectItem value="">All Types</SelectItem>
            {courseTypes.map((type, idx) => (
              <SelectItem key={idx} value={type}>{type}</SelectItem>
            ))}
          </Select>
        </CardContent>
      </Card>

      {/* Student Registrations */}
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-semibold">Student Registration</h2>
          {offerings.map((off, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="font-medium">{off}</h3>
              <Input
                placeholder="Student Name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    registerStudent(off, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <ul>
                {getStudentsForOffering(off).map((r, i) => (
                  <li key={i}>{r.studentName}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationSystem;
