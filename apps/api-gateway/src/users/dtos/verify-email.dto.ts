import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Verification } from 'orm';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class VerifyEmailInput extends PickType(Verification, ['code']) {}

@ObjectType()
export class VerifyEmailOutput /* extends CoreOutput */ {}
