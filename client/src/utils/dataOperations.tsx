export function dateFormat(isoDate) {
  const parts = isoDate.split("T")[0].split("-");
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}-${month}-${year}`;
}

// export async function getTaskCount(projectId) {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/api/task/project/${projectId}`
//     );

//     if (!response.status) {
//       throw new Error("Tasks not fetched");
//     }

//     const result = await response.json();
//     console.log(result);
//     return "Hi";
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function getProjectCount() {}
