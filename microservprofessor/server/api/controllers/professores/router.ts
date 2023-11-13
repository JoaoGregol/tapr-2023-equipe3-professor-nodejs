import express from 'express';
import controller from './professorcontroller';

export default express
    .Router()
    .get('/', controller.all)
