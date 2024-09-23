import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";

export async function createUserAccout(user: INewUser) {
  try {
    const newAccout = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccout) {
      throw new Error();
    }

    const avatarUrl: any = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccout.$id,
      name: user.name,
      email: user.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

const saveUserToDB = async (user: {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: string;
}) => {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getCurrentAccount() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) return Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) return Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  try {
    const seesion = await account.deleteSession("current");
    return seesion;
  } catch (error) {
    console.log(error);
  }
}
