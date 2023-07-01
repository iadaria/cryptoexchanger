import { Output } from "src/common/interfaces/output.interface";

export interface Jwt extends Output {
  token?: string;
}