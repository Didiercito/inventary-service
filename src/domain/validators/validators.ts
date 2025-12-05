import {
  validate,
  ValidationError,
} from "class-validator";
import { plainToInstance } from "class-transformer";

export async function validateInput<T extends object>(
  dtoClass: new (...args: any[]) => T,
  data: unknown
): Promise<T> {

  const instance = plainToInstance(dtoClass, data, {
    enableImplicitConversion: true,
  });

  const errors = await validate(instance, {
    whitelist: true,              
    forbidUnknownValues: true,    
  });

  if (errors.length > 0) {
    throw buildValidationException(
      `Validación fallida para ${dtoClass.name}`,
      errors
    );
  }

  return instance;
}

export async function validateInstance<T extends object>(
  instance: T
): Promise<T> {

  const errors = await validate(instance, {
    whitelist: true,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    throw buildValidationException(
      `Validación de instancia fallida (${instance.constructor.name})`,
      errors
    );
  }

  return instance;
}

function buildValidationException(message: string, errors: ValidationError[]) {
  return {
    success: false,
    message,
    errors: mapValidationErrors(errors),
  };
}

function mapValidationErrors(errors: ValidationError[]): any[] {
  return errors.map(err => ({
    property: err.property,
    constraints: err.constraints,
    children: err.children?.length
      ? mapValidationErrors(err.children)
      : undefined,
  }));
}