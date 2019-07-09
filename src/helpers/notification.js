import { NotificationManager } from "Components/ReactNotifications";

export const CreateNotification = result => {
  //let cName = className || "";

  switch (result.status) {
    case 201:
      NotificationManager.success(
        "با موفقیت انجام شد",
        "عملیات",
        3000,
        null,
        null,
        ""
      );
      break;
    case 204:
      NotificationManager.success(
        "با موفقیت انجام شد",
        "عملیات",
        3000,
        null,
        null,
        ""
      );
      break;
    case "error":
      NotificationManager.error(
        "خطا در عملیات",
        "کلیک کنید",
        5000,
        () => {
          alert("عملیات ناموفق");
        },
        null,
        ""
      );
      break;
    default:
      NotificationManager.info("Info message");
      break;
  }
};
