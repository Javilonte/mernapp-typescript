import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import morgan from 'morgan';
import createHttpError, { isHttpError} from "http-errors";

const app = express();

app.use(morgan('dev'));

app.use(express.json()); // Parse JSON bodies from us in POST requests

app.use("/api/notes", notesRoutes);

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