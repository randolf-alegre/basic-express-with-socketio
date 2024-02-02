const authenticate = require("./middleware");
const { register, login } = require("./controller/auth/authController");
const {
  create,
  getEmployee,
  deleteEmployee,
  editEmployee,
} = require("./controller/employee/employeeController");
const route = (app) => {
  app.post("/login", (req, res) => {
    login(req, res);
  });

  app.get("/register", (req, res) => {
    register(req, res);
  });

  app.post("/employees/create", authenticate, async (req, res) => {
    const newEmployee = await create(req, res);
    req.io.emit("new-employee", newEmployee);
  });

  app.get("/employees", authenticate, (req, res) => {
    getEmployee(req, res);
  });

  app.delete("/employees/:id", authenticate, async (req, res) => {
    const response = await deleteEmployee(req, res);

    if(response) {
      const { id } = req.params;
      req.io.emit("delete-employee", { id });
    }

  });

  app.patch("/employees/:id", authenticate, async (req, res) => {
    const updatedEmployee = await editEmployee(req, res);
    req.io.emit("updated-employee", { ...updatedEmployee });
  });
};

module.exports = route;
