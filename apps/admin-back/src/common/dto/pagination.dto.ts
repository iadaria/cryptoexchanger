import { Field, Int } from '@nestjs/graphql';
import { CoreOutput } from './output.dto';

export class PaginationInput {
  @Field((type) => Int, { defaultValue: 1 })
  page: number;
}

export class PaginationOutput extends CoreOutput {
  @Field((type) => Int, { nullable: true })
  totalPages?: number;

  @Field((type) => Int, { nullable: true })
  totalResults?: number;
}
