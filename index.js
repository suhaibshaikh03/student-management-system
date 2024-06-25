#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses
        this.balance = 100;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }
    show_status() {
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses.join(', ')}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
        else {
            console.log("Student not found. Please enter a correct student ID");
        }
    }
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome to Suhaib's Student Management System");
    console.log("---------------------------------------------------------------");
    let studentManager = new StudentManager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: 'choice',
                type: 'list',
                message: 'Select an option',
                choices: [
                    'Add Student',
                    'Enroll Student',
                    'View Student Balance',
                    'Pay Fees',
                    'Show Status',
                    'Exit'
                ]
            }
        ]);
        switch (choice.choice) {
            case 'Add Student':
                let nameInput = await inquirer.prompt([
                    {
                        name: 'name',
                        type: 'input',
                        message: 'Enter a Student Name'
                    }
                ]);
                studentManager.add_student(nameInput.name);
                break;
            case 'Enroll Student':
                let courseInput = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'number',
                        message: 'Enter a student ID'
                    },
                    {
                        name: 'course',
                        type: 'input',
                        message: 'Enter a Course Name'
                    }
                ]);
                studentManager.enroll_student(courseInput.student_id, courseInput.course);
                break;
            case 'View Student Balance':
                let balanceInput = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'number',
                        message: 'Enter a student ID'
                    }
                ]);
                studentManager.view_student_balance(balanceInput.student_id);
                break;
            case 'Pay Fees':
                let feesInput = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'number',
                        message: 'Enter a student ID'
                    },
                    {
                        name: 'amount',
                        type: 'number',
                        message: 'Enter the amount to pay'
                    }
                ]);
                studentManager.pay_student_fees(feesInput.student_id, feesInput.amount);
                break;
            case 'Show Status':
                let statusInput = await inquirer.prompt([
                    {
                        name: 'student_id',
                        type: 'number',
                        message: 'Enter a student ID'
                    }
                ]);
                studentManager.show_student_status(statusInput.student_id);
                break;
            case 'Exit':
                console.log('Exiting...');
                process.exit();
        }
    }
}
// Invoking main function
main();
