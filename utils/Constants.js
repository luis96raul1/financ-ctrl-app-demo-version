export const IsLoggedStatus = "isLogged";
export const NotLoggedStatus = "non-authenticated";
export const IsAuthenticating = "checking";
export const errorMessages = {
  "auth/wrong-password": "Contraseña incorrecta",
  "auth/too-many-requests":
    "Demasiados intentos, prueba nuevamente en un momento",
  "auth/email-already-in-use": "Este email ya está en uso",
  "auth/user-disabled": "Cuenta desabilitada",
  "auth/user-not-found": "Usuario no encontrado",
};

export const TypeCategory = "categories";
export const TypeMovement = "movements";
export const TypeComment = "comments";

export const Lazy = "Nothing-in-process";
export const Busy = "Task-in-process";
export const Stack = "Stack-in-process";
export const Next = "Ready-to-next-process";
export const Error = "There-was-an-error";

export const GlobalCategoriesIds = "categoriesIds";
export const GlobalMovementsIds = "movementsIdsByCategoryIds";
export const GlobalCommentsIds = "commentsIdsByMovementAndCategoryIds";

//Loading modifiers
export const Default = "default";
export const Spinner = "spinner";
export const Points = "points";
export const PointsOpacity = "points-opacity";
export const Gradient = "gradient";
export const PrimaryColor = "primary";
export const SecondaryColor = "secondary";
export const SuccessColor = "success";
export const WarningColor = "warning";
export const ErrorColor = "error";

//Themes
export const DarkTheme = "dark";
export const LightTheme = "light";
