// import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
// import { plainToClass, plainToInstance } from "class-transformer";
// import { validate } from "class-validator";
// import { ValidationExecutor } from "class-validator/types/validation/ValidationExecutor";
// import { ValidationException } from "../exception/validation.exception";
//
// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//   async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
//     const obj = plainToInstance(metadata.metatype, value); // создал объект для валидацияя (функция будетпреоразовывать значение в нужный нам класс
//     const errors = await validate(obj); //функция выдаст ошибки
//
//     //если есть ошибки пробегемся по массиву ошиббок с помощтю функции (мар) и преобразовываем объекты
//     if(errors.length) {
//       console.log(errors)
//       // let messages = errors.map(arr => {
//       //   return `${err.property}`
//       // )
//       throw new ValidationException('');
//     }
//     return value;
//   }
//
// }