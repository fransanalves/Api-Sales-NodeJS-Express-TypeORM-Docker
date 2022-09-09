import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { routes } from './routes';
import { MessageError } from '@shared/errors/MessageError';
import '@shared/typeorm/data-source';
import { DataSourceConnection } from '@shared/typeorm/data-source';

DataSourceConnection.initialize().then(() => {
  const server = express();

  server.use(cors());
  server.use(express.json());

  server.use(routes);

  server.use(errors());

  server.use(
    (error: Error, req: Request, res: Response, next: NextFunction) => {
      if (error instanceof MessageError) {
        return res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

  server.listen(3333, () => {
    console.log('Server started on port 3333.');
  });
});
