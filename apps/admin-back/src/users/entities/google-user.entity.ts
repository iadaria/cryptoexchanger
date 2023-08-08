import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from 'src/common/entities/core.entity';
import { AuthWay, User } from './user.entity';
import { CreateUser } from '../interfaces/create-user.interface';

//* Should be as Typeorm only type, not Graphql

@InputType('GoogleInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class GoogleUser extends CoreEntity {

  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  googleId: string;

  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified_email: boolean;

  @Column()
  @Field((type) => String)
  @IsString()
  name: string;

  @Column()
  @Field((type) => String)
  @IsString()
  given_name: string;

  @Column()
  @Field((type) => String)
  @IsString()
  family_name: string;

  @Column()
  @Field((type) => String)
  @IsString()
  picture: string;

  @Column()
  @Field((type) => String)
  @IsString()
  locale: string;

  @OneToOne(type => User, { onDelete: 'CASCADE'})
  @JoinColumn()
  user: User;

  basicUser(): CreateUser {
    return {
      email: this.email,
      verified: this.verified_email,
      authWay: AuthWay.Google,
      password: 'google password'
    }
  }
}
