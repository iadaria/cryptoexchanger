import { User } from "@/__generated__/graphql";
import { AccountDomain } from "@/store/app";

export const $users = AccountDomain.createStore<User[]>([]);

export const fetchAllUsers = AccountDomain.createEvent();

export const fetchAllUsersFx = AccountDomain.createEffect<void, User[]>();
