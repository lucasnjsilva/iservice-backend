import { validator } from '@ioc:Adonis/Core/Validator';
import { cpf, cnpj } from 'cpf-cnpj-validator';

validator.rule('cpf', (value, _, options) => {
  const numbers = value.replace(/[^\d]+/g, '');

  if (!cpf.isValid(numbers)) {
    options.errorReporter.report(
      options.pointer,
      'cpf',
      'CPF validation failed.',
      options.arrayExpressionPointer
    );
  }
});

validator.rule('cnpj', (value, _, options) => {
  const numbers = value.replace(/[^\d]+/g, '');

  if (!cnpj.isValid(numbers)) {
    options.errorReporter.report(
      options.pointer,
      'cnpj',
      'CNPJ validation failed.',
      options.arrayExpressionPointer
    );
  }
});
