import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from '../../common/dto/output.dto';

@InputType()
export class CreateAccountInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
