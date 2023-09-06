"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// app.ts
var import_cors = __toESM(require("cors"));
var import_express6 = __toESM(require("express"));

// src/routes/loginRouter.ts
var import_express = require("express");

// src/controllers/loginController.ts
var fs = __toESM(require("fs"));
var login = async (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      console.error("Erreur de lecture du fichier JSON :", err);
      res.status(500).json({ message: "Erreur interne du serveur" });
      return;
    }
    try {
      const users = JSON.parse(data);
      const { code, name } = req.body;
      let isConnect = false;
      users.forEach((user) => {
        if (user.code === code && user.name === name) {
          isConnect = true;
        }
      });
      if (isConnect) {
        res.status(200).json({ message: "Connect\xE9" });
      } else {
        res.status(401).json({ message: "Identifiants incorrects" });
      }
    } catch (parseError) {
      console.error("Erreur d'analyse JSON :", parseError);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  });
};
var loginController_default = {
  login
};

// src/routes/loginRouter.ts
var router = (0, import_express.Router)();
router.post("/", loginController_default.login);
var loginRouter_default = router;

// src/routes/bookRouter.ts
var import_express2 = require("express");

// src/models/model.ts
var import_mongoose = require("mongoose");
var schemaBook = new import_mongoose.Schema({
  title: { type: String },
  author: { type: String },
  available: { type: Boolean },
  borrow_date: { type: import_mongoose.Schema.Types.Mixed },
  self_service_id: { type: import_mongoose.Schema.Types.ObjectId, ref: "selfservice" },
  user_id: { type: import_mongoose.Schema.Types.Mixed }
});
var schemaSelfPoint = new import_mongoose.Schema({
  location: { type: String },
  address: { type: String },
  zip_code: { type: Number }
});
var modelBook = (0, import_mongoose.model)("book", schemaBook);
var modelSelfService = (0, import_mongoose.model)("selfservice", schemaSelfPoint);

// src/controllers/bookController.ts
var getBook = async (req, res) => {
  const result = await modelBook.find({}).populate("self_service_id");
  res.status(200).json({ message: "allBook", result });
};
var getBookById = async (req, res) => {
  const result = await modelBook.findById(req.params.id);
  res.status(200).json({ message: "A book!", result });
};
var addBook = async (req, res) => {
  const result = await modelBook.create(req.body);
  res.status(200).json({ message: "Book added", result });
};
var updateBook = async (req, res) => {
  const result = await modelBook.findOneAndUpdate({ title: req.params.title }, req.body);
  res.status(200).json({ message: "book Update", result });
};
var deleteBook = async (req, res) => {
  const result = await modelBook.deleteOne({ id: req.params._id });
  res.status(200).json({ message: "Book ad", result });
};
var bookController_default = {
  getBook,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};

// src/routes/bookRouter.ts
var router2 = (0, import_express2.Router)();
router2.get("/", bookController_default.getBook);
router2.get("/:id", bookController_default.getBookById);
router2.post("/", bookController_default.addBook);
router2.put("/:title", bookController_default.updateBook);
router2.delete("/:id", bookController_default.deleteBook);
var bookRouter_default = router2;

// app.ts
var dotenv2 = __toESM(require("dotenv"));

// src/database/connect.ts
var import_mongoose2 = __toESM(require("mongoose"));
var dotenv = __toESM(require("dotenv"));
dotenv.config();
var url = `mongodb+srv://${process.env.DATABASE}`;
var connectDb = async () => {
  import_mongoose2.default.set("strictQuery", false);
  import_mongoose2.default.connect(url).then(() => console.log("COOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONect")).catch((error) => console.log(error));
};

// src/routes/selfServiceRouter.ts
var import_express3 = require("express");

// src/controllers/selfServiceController.ts
var getSelfService = async (req, res) => {
  const result = await modelSelfService.find({});
  res.status(200).json({ message: "allSelfService", result });
};
var getSelfServiceById = async (req, res) => {
  const result = await modelSelfService.findById(req.params.id);
  res.status(200).json({ message: "A book!", result });
};
var addSelfService = async (req, res) => {
  modelSelfService.init();
  const result = await modelSelfService.create(req.body);
  res.status(200).json({ message: "SelfService added", result });
};
var updateSelfService = async (req, res) => {
  const result = await modelSelfService.findOneAndUpdate({ location: req.params.location }, req.body);
  res.status(200).json({ message: "selfService Update", result });
};
var deleteSelfService = async (req, res) => {
  const result = await modelSelfService.deleteOne({ location: req.params.location });
  res.status(200).json({ message: "SelfService ad", result });
};
var selfServiceController_default = {
  getSelfService,
  getSelfServiceById,
  addSelfService,
  updateSelfService,
  deleteSelfService
};

// src/routes/selfServiceRouter.ts
var router3 = (0, import_express3.Router)();
router3.get("/", selfServiceController_default.getSelfService);
router3.get("/:id", selfServiceController_default.getSelfServiceById);
router3.post("/", selfServiceController_default.addSelfService);
router3.put("/:location", selfServiceController_default.updateSelfService);
router3.delete("/:location", selfServiceController_default.deleteSelfService);
var selfServiceRouter_default = router3;

// src/routes/borrowRouter.ts
var import_express4 = require("express");

// src/controllers/borrowController.ts
var import_axios = __toESM(require("axios"));
var borrowBook = async (req, res) => {
  const resultAxios = await import_axios.default.get("http://141.94.247.187:3000/api/v1/list").then((response) => {
    return response.data;
  });
  let code_user = false;
  const data = req.body;
  resultAxios.forEach((item) => {
    if (item.code === data.user_id) {
      code_user = true;
    }
  });
  let borrow = await modelBook.findOne({ title: req.params.title });
  switch (borrow) {
    case null:
      res.status(404).json("Rien trouver");
      break;
    case void 0:
      res.status(404).json("Rien trouver");
      break;
    default:
      borrow.user_id = data.user_id;
      borrow.borrow_date = new Date();
      borrow.available = false;
      borrow.self_service_id = void 0;
      borrow.save();
      res.status(200).json({ message: "Book borrowed", borrow });
      break;
  }
};
var borrowController_default = {
  borrowBook
};

// src/routes/borrowRouter.ts
var router4 = (0, import_express4.Router)();
router4.put("/:title", borrowController_default.borrowBook);
var borrowRouter_default = router4;

// src/routes/renderRouter.ts
var import_express5 = require("express");

// src/controllers/renderController.ts
var renderBook = async (req, res) => {
  let render = await modelBook.findOne({ title: req.params.title });
  switch (render) {
    case null:
      res.status(404).json("Rien trouver");
      break;
    case void 0:
      res.status(404).json("Rien trouver");
      break;
    default:
      render.user_id = null;
      render.borrow_date = null;
      render.available = true;
      render.self_service_id = req.body.self_service_id;
      render.save();
      res.status(200).json({ message: "Book returned", render });
      break;
  }
};
var renderController_default = {
  renderBook
};

// src/routes/renderRouter.ts
var router5 = (0, import_express5.Router)();
router5.put("/:title", renderController_default.renderBook);
var renderRouter_default = router5;

// app.ts
var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");
var app = (0, import_express6.default)();
app.use((0, import_cors.default)());
app.use(import_express6.default.json());
dotenv2.config();
var swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Books API",
      description: "API for books management app",
      contact: {
        name: "Dieu"
      }
    }
  },
  apis: [`./src/routes/*.ts`]
};
var swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/book", bookRouter_default);
app.use("/api/login", loginRouter_default);
app.use("/api/selfservice", selfServiceRouter_default);
app.use("/api/borrow", borrowRouter_default);
app.use("/api/render", renderRouter_default);
var app_default = app;

// server.ts
var port = process.env.PORT || 5e3;
app_default.listen(port, async () => {
  await connectDb();
  console.log(`Serveur d\xE9marr\xE9 sur le port ${port}...`);
});
