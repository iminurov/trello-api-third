import { HttpException, HttpStatus } from '@nestjs/common';
import { response } from 'express';
import { constants } from 'http2';

export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
