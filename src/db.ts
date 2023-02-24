export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    city: string;
  }
  
  const users: User[] = [
    { id: 1, name: "jon Snow", username: "Wolf", email: "jon@snow.com", city: "New York" },
    { id: 2, name: "Darth Vader", username: "Vader", email: "darth@vader.com", city: "New York" },
    { id: 3, name: "Frodo Baggins", username: "Frodo", email: "frodo@baggins.com", city: "New York" },
    { id: 4, name: "Indiana Jones", username: "Indy", email: "indiana@jones.com", city: "New York" },
    { id: 5, name: "Luke Skywalker", username: "Luke", email: "luke@skywalker.com", city: "New York" },
  ];
  
  export function getUsers() {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve(users);
      }, 1000);
    });
  }
  
  export function getUserById(id: number) {
    return new Promise<User>((resolve, reject) => {
      const user = users.find((user) => user.id === id);
      if (user) {
        setTimeout(() => {
          resolve(user);
        }, 1000);
      } else {
        reject(new Error("User not found"));
      }
    });
  }
  
  export function addUser(user: User) {
    return new Promise<User>((resolve) => {
      user.id = users.length + 1;
      users.push(user);
      setTimeout(() => {
        resolve(user);
      }, 1000);
    });
  }
  
  export function updateUser(user: User) {
    return new Promise<User>((resolve, reject) => {
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        setTimeout(() => {
          resolve(user);
        }, 1000);
      } else {
        reject(new Error("User not found"));
      }
    });
  }
  
  export function deleteUser(id: number) {
    return new Promise<number>((resolve, reject) => {
      const index = users.findIndex((user) => user.id === id);
      if (index !== -1) {
        users.splice(index, 1);
        setTimeout(() => {
          resolve(id);
        }, 1000);
      } else {
        reject(new Error("User not found"));
      }
    });
  }
  