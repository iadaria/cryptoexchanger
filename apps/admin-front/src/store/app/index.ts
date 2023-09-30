import { Domain, createDomain } from "effector/compat";
import { AppDomain } from "./constants";

export const AccountDomain = createDomain(AppDomain.Account);

export const domains: Domain[] = [AccountDomain];
