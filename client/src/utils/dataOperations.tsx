import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export function dateFormat(isoDate) {
  const parts = isoDate.split("T")[0].split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  const targetDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const difference = targetDate.getTime() - currentDate.getTime();

  const daysRemaining = Math.ceil(difference / (1000 * 60 * 60 * 24));

  const formattedDate = `${day}-${month}-${year}`;
  const otherformattedDate = `${year}-${month}-${day}`;

  return {
    formattedDate: formattedDate,
    remainingDays: daysRemaining,
    otherformattedDate: otherformattedDate,
  };
}

export async function authControll(navigate, flag = false) {
  const token = Cookies.get("token");

  if (!token) {
    navigate("/");
    return;
  }

  try {
    const user = jwtDecode(token);
    if (!user) {
      Cookies.remove("token");
      navigate("/");
    }

    if (flag) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/current-user/${user.email}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const userId = await response.json();
        return { ...user, userId };
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
        Cookies.remove("token");
        navigate("/");
      }
    }
    return user;
  } catch (error) {
    console.error("Invalid token:", error);
    Cookies.remove("token");
    navigate("/");
  }
}

export async function fetchTaskCounts(projectId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/task/count/${projectId}`
    );

    if (!response.status) {
      throw new Error("Tasks not fetched");
    }

    const result = await response.json();
    console.log(result.count);
    return result.count;
  } catch (error) {
    console.error("Error fetching task counts:", error);
  }
}

// export function getProjectCount() {}
