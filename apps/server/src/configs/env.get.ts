import { DEFAULT_PORT } from "src/common/common.constants";

export const getPort = () => process.env.PORT || DEFAULT_PORT;
