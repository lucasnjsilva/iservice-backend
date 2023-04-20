import { type ResponseContract } from '@ioc:Adonis/Core/Response';
import { ValidationException } from '@ioc:Adonis/Core/Validator';
import AppError from './AppError';

export default {
  Success: function (response: ResponseContract, data?: any) {
    if (typeof data === 'string') {
      data = { message: data };
    }

    response.json({
      status: 'OK',
      result: data || null,
      error: null,
    });
  },

  Pagination: function (response: ResponseContract, data: any) {
    const result = data.toJSON ? data.toJSON() : data;

    response.json({
      status: 'OK',
      result: result.data || [],
      pagination: {
        page: result.meta.current_page,
        lastPage: result.meta.last_page,
        total: result.meta.total,
        perPage: result.meta.per_page,
      },
      error: null,
    });
  },

  Error: function (
    ...args:
      | [response: ResponseContract, error: AppError | Error]
      | [response: ResponseContract, code: string, message?: string, statusCode?: number]
  ): void {
    const [response, code, message, statusCode] = args;

    if (code instanceof AppError) {
      this.AppError(response, code);
      return;
    } else if (code instanceof ValidationException) {
      const messages = (code as any).messages;

      response.status(400).json({
        status: 'ERROR',
        error: {
          code: 'VALIDATION_ERROR',
          issues: messages.errors ? messages.errors.map((e: any) => e.message) : messages,
        },
      });
      return;
    } else if (code instanceof Error) {
      if (
        code.message.startsWith('E_ROUTE_NOT_FOUND') ||
        code.message.startsWith('E_ROW_NOT_FOUND')
      ) {
        response.status(404).json({
          status: 'ERROR',
          error: {
            code: 'NOT_FOUND',
          },
        });

        return;
      }

      if (code.message.startsWith('E_UNAUTHORIZED_ACCESS')) {
        response.status(401).json({
          status: 'ERROR',
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must to be logged in.',
          },
        });

        return;
      }

      response.status(statusCode ?? 500).json({
        status: 'ERROR',
        error: {
          code: 'INTERNAL_ERROR',
          message: code.message,
        },
      });

      return;
    }

    response.status(statusCode ?? 500).json({
      status: 'ERROR',
      error: {
        code,
        message,
      },
    });
  },

  AppError: function (response: ResponseContract, error: AppError) {
    response.status(error.status).json({
      status: 'ERROR',
      error: {
        message: error.message,
      },
    });
  },
};
