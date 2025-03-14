import Cookies from "js-cookie";

export const register = (userData: any) => {
  const users = JSON.parse(Cookies.get("users") || "[]");

  // Vérifier si l'email ou le pseudo existe déjà
  const userExists = users.some(
    (user: any) => user.email === userData.email || user.pseudo === userData.pseudo
  );

  if (userExists) {
    throw new Error("L'utilisateur existe déjà.");
  }

  // Ajouter l'utilisateur
  users.push(userData);
  Cookies.set("users", JSON.stringify(users), { expires: 7, path: "/" });

  return { message: "Inscription réussie !" };
};

export const login = (identifier: string, password: string) => {
  const users = JSON.parse(Cookies.get("users") || "[]");

  // Trouver l'utilisateur
  const user = users.find(
    (user: any) =>
      (user.email === identifier || user.pseudo === identifier || user.phoneNumber === identifier) &&
      user.password === password
  );

  if (!user) {
    throw new Error("Identifiants incorrects.");
  }

  // Stocker l'utilisateur connecté dans un cookie sécurisé
  Cookies.set("currentUser", JSON.stringify(user), {
    expires: 1, // 1 jour
    path: "/",
    secure: process.env.NODE_ENV === "production", // Active secure en production
    sameSite: "Strict",
  });

  return { message: "Connexion réussie !" };
};

export const logoutUser = () => {
  Cookies.remove("currentUser");
};

export const getCurrentUser = () => {
  const user = Cookies.get("currentUser");
  return user ? JSON.parse(user) : null;
};
