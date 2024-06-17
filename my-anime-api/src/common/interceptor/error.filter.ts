import { HttpException, Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessage } from './schemas/error-message.schema';

@Catch(HttpException)
export class ErrorFilter implements ExceptionFilter {
  constructor(@InjectModel(ErrorMessage.name) private errorMessageModel: Model<ErrorMessage>) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const message = exception.getResponse() as string;

    await this.errorMessageModel.create({
      method: request.method,
      route: request.url,
      error_message: `${message}`,
    });

    response.status(status).json({
      statusCode: status,
      message: JSON.stringify(message),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
