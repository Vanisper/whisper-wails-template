declare module 'vue' {
	export interface ComponentCustomProperties {
		vPermission?: typeof import('./permission')['default'];
		vSortable?: typeof import('./sortable')['default'];
		vHorizontalScrolling?: typeof import('./horizontal-scrolling')['default'];
	}
}

export {};