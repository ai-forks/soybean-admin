import type { MockMethod } from "vite-plugin-mock";
import { routeModel, userModel } from "../model";
import { mockUrl } from "./tool";

const apis: MockMethod[] = [
	{
		url: mockUrl("/getUserRoutes"),
		method: "post",
		response: (options: Service.MockOption): Service.MockServiceResult => {
			const { userId = undefined } = options.body;

			const routeHomeName: AuthRoute.LastDegreeRouteKey = "dashboard_analysis";

			const role =
				userModel.find((item) => item.userId === userId)?.userRole || "user";

			const filterRoutes = routeModel[role];

			return {
				code: 200,
				message: "ok",
				data: {
					routes: filterRoutes,
					home: routeHomeName,
				},
			};
		},
	},
];

export default apis;
