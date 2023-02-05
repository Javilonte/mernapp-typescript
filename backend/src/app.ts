import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';
import createHttpError, { isHttpError} from "http-errors";
import userRoutes from './routes/users';
import session from 'express-session';
import env from './util/validateEnv';
import MongoStore from "connect-mongo";

const app = express();

app.use(morgan('dev'));

app.use(express.json()); // Parse JSON bodies from us in POST requests


// It uses the session middleware to create a session for each user
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
  rolling: true,
  store: MongoStore.create({
    mongoUrl: env.MONGO_CONNECTION_STRING,
  })
}))

app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);

app.use((req,res,next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

//eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred!";
  let statusCode = 500;
  // If the error is an instance of httpError class, it uses its values to get the error message and status code
  if(isHttpError(error)){
    statusCode = error.status;
    errorMessage = error.message;
  }
   // It stablish the status code and sends a JSON response with the error message 
  res.status(statusCode).json({ error: errorMessage });
})

export default app;