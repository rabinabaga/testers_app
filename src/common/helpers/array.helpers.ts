import { ValidationError } from '@nestjs/common';

export function flattenErrors(
  errors: ValidationError[],
  parentPath = '',
): {
  path: string;
  msg: string;
  value: any;
}[] {
  const result: any[] = [];

  for (const error of errors) {
    const propertyPath = parentPath
      ? /^\d+$/.test(error.property) // if property is a number (array index)
        ? `${parentPath}[${error.property}]`
        : `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      for (const key in error.constraints) {
        result.push({
          path: propertyPath,
          msg: error.constraints[key],
          value: error.value,
        });
      }
    }

    if (error.children?.length) {
      result.push(...flattenErrors(error.children, propertyPath));
    }
  }

  return result;
}
