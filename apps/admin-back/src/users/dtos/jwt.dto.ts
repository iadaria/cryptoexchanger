import { Output } from 'src/common/dtos/output.dto';

export type Jwt = Output & {
  token?: string;
};
