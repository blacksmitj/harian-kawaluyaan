// import { Report, User } from "@prisma/client";
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";

// type ReportWithUser = Report & {
//   user: User;
// };

// interface IUseReport {
//   start: number;
// }

// const useReport =  ({
//   start,
// }: IUseReport) => {
//   const [reports, setReports] = useState<ReportWithUser[]>([]);
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(false)
//   const [hasMore, setHasMore] = useState(true)
//   const [limit, setLimit] = useState(5);
//   const [IsRefresh, setIsRefresh] = useState(false)
//   const [isStart, setIsStart] = useState(start)

//   useEffect(() => {
//     console.log("start dimulai dari",start);
//     setIsLoading(true)
//     setError(false)
  
//     axios({
//       method: 'GET',
//       url: '/api/dashboard',
//       params: {
//         start: isStart,
//         limit,
//     },
//     })
//     .then(res => {
//       const results = res.data.result.map((result: any) => ({
//         ...result,
//         createdAt: new Date(result.createdAt),
//         updatedAt: new Date(result.updatedAt),
//         user: {
//           ...result.user,
//           createdAt: new Date(result.user.createdAt),
//         },
//       }));
  
//       setReports([...reports, ...results]);
      
//       setHasMore(res.data.result.length > 0);
//     })
//     .catch(() => {
//       setError(true)
//     })
//     .finally( () => {
//       setIsLoading(false)
//     })
//     setIsRefresh(false)
//     console.log("reports di hooks", reports);
//   }, [start])


//   const refresh = () => {
//     setIsLoading(true)
//     setError(false)
  
//     axios({
//       method: 'GET',
//       url: '/api/dashboard',
//       params: {
//         start: 0,
//         limit,
//     },
//     })
//     .then(res => {
//       const results = res.data.result.map((result: any) => ({
//         ...result,
//         createdAt: new Date(result.createdAt),
//         updatedAt: new Date(result.updatedAt),
//         user: {
//           ...result.user,
//           createdAt: new Date(result.user.createdAt),
//         },
//       }));

//       // setReports([...reports, ...results]);
//       setReports(results);
//       setHasMore(res.data.result.length > 0);
//     })
//     .catch(() => {
//       setError(true)
//     })
//     .finally( () => {
//       setIsLoading(false)
//     })
//     console.log("hooks refresh", reports);
//   }


//   return {isLoading, error, reports, hasMore, refresh}
// }

// export default useReport