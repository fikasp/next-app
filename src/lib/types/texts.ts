// texts interface

export interface TXT {
	common: {
		ADD: string
		ADDING: string
		CANCEL: string
		CONTINUE: string
		ERROR: string
		LOADING: string
		PROJECT: string
		PROJECTS: string
		SEARCH: string
		SUCCESS: string
		UPDATE: string
		UPDATING: string
		UPLOADING: string
		WARNING: string
	}
	dialogs: {
		ADD_OPTION: string
		CLOSE_OPTIONS: string
		DELETE_NOTIFICATION_1: string
		DELETE_NOTIFICATION_2: string
		ENTER_NEW_CATEGORY: string
		MANAGE_OPTIONS: string
	}
	errors: {
		CATEGORY_EXISTS: string
		CATEGORY_NOT_FOUND: string
		CATEGORY_NAME_REQUIRED: string
		CATEGORY_USED: string
		IMAGE_NOT_FOUND: string
		PROJECT_NOT_FOUND: string
		UNAUTHORIZED_ACCESS: string
	}
	forms: {
		CATEGORY_LABEL: string
		CATEGORY_PLACEHOLDER: string
		INFORMATION_LABEL: string
		INFORMATION_PLACEHOLDER: string
		SEARCH_PROJECTS: string
		SELECT_A_VALUE: string
		SHOW_ONLY_MY_PROJECTS: string
		TITLE_LABEL: string
		TITLE_PLACEHOLDER: string
		UPLOAD_IMAGE: string
		UPLOAD_IMAGES: string
	}
	manipulations: {
		COVER_CREATE: string
		COVER_DELETE: string
		IMAGE_DELETE: string
		IMAGE_UPDATE: string
		PROJECT_DELETE: string
		PROJECT_UPDATE: string
	}
	menu: {
		ADD: string
		ADMIN: string
		KANBAN: string
		PROFILE: string
		SEARCH: string
		SORT_CUSTOM: string
		SORT_DATE: string
		SORT_OPTIONS: string
		SORT_TITLE: string
		SORT_USER: string
		SORT: string
		THEME: string
		THEME_DARK: string
		THEME_LIGHT: string
		THEME_SYSTEM: string
	}
	shared: {
		DND: string
		SELECT_IMAGE: string
		SELECT_IMAGES: string
	}
	toasts: {
		CATEGORY_ADDED: string
		CATEGORY_DELETED: string
		CATEGORY_UPDATED: string
		CATEGORY: string
		IMAGE_ADDED: string
		IMAGE_COVER_REMOVE: string
		IMAGE_COVER_SET: string
		IMAGE_DELETED: string
		IMAGE_UPDATED: string
		IMAGE_UPLOAD_FAILED: string
		IMAGE: string
		PROJECT_ADDED: string
		PROJECT_DELETED: string
		PROJECT_UPDATED: string
		PROJECT: string
	}
	zod: {
		CATEGORY: string
		INFO: string
		TITLE: string
	}
}
