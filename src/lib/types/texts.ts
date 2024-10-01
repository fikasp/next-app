// texts interface

export interface TXT {
	common: {
		ADD: string
		ADDING: string
		CANCEL: string
		LOADING: string
		PROJECT: string
		UPDATE: string
		UPDATING: string
		UPLOADING: string
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
	forms: {
		CATEGORY_LABEL: string
		CATEGORY_PLACEHOLDER: string
		INFORMATION_LABEL: string
		INFORMATION_PLACEHOLDER: string
		SHOW_ONLY_MY: string
		TITLE_LABEL: string
		TITLE_PLACEHOLDER: string
		UPLOAD_IMAGE: string
		UPLOAD_IMAGES: string
	}
	shared: {
		DND: string
		SELECT_IMAGE: string
		SELECT_IMAGES: string
	}
	zod: {
		CATEGORY: string
		INFO: string
		TITLE: string
	}
}
