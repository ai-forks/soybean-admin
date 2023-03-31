const dashboard: AuthRoute.Route = {
	name: "dashboard",
	path: "/dashboard",
	component: "basic",
	children: [
		{
			name: "dashboard_analysis",
			path: "/dashboard/analysis",
			component: "self",
			meta: {
				title: "写作",
				requiresAuth: true,
				icon: "icon-park-outline:analysis",
			},
		},
		{
			name: "dashboard_analysis",
			path: "/dashboard/analysis",
			component: "self",
			meta: {
				title: "文生图",
				requiresAuth: true,
				icon: "icon-park-outline:analysis",
			},
		},
		{
			name: "dashboard_workbench",
			path: "/dashboard/workbench",
			component: "self",
			meta: {
				title: "图生图",
				requiresAuth: true,
				icon: "icon-park-outline:workbench",
			},
		},
	],
	meta: {
		title: "仪表盘",
		icon: "mdi:monitor-dashboard",
		order: 1,
	},
};

export default dashboard;
