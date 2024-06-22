export function dateFormat(isoDate) {
  const parts = isoDate.split("T")[0].split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}-${month}-${year}`;
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
    return result;
  } catch (error) {
    console.error("Error fetching task counts:", error);
  }
}

// export function getProjectCount() {}
