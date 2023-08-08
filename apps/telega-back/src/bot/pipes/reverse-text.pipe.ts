import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ReverseTextPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const text = String(value);

        return text.split('').reverse().join('');
    }
}