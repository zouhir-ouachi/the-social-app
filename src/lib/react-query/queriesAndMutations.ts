import { INewUser } from "@/types";
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUserAccout, signInAccount, signOut } from "../appwrite/api";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccout(user),
  });
};

export const useSignInAccout = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOut,
  });
};
