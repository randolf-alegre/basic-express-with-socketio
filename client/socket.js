const socket = io();

socket.on("new-employee", (data) => {
  console.log(data);
});

socket.on("delete-employee", (data) => {
  console.log(data);
});

socket.on("updated-employee", (data) => {
  console.log(data);
});
