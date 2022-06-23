import { Router } from 'express';

interface Route {
  getRouter(): Router;
}

export default Route;
