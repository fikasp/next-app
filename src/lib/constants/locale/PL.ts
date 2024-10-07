import { TXT } from '@/lib/types/texts'

export const PL: TXT = {
	common: {
		ADD: 'Dodaj',
		ADDING: 'Dodawanie...',
		CANCEL: 'Anuluj',
		CONTINUE: 'Kontynuuj',
		ERROR: 'Błąd!',
		LOADING: 'Ładowanie...',
		PROJECT: 'projekt',
		PROJECTS: 'projekty',
		SEARCH: 'Wyszukaj',
		SUCCESS: 'Sukces!',
		UPDATE: 'Edytuj',
		UPDATING: 'Edytowanie...',
		UPLOADING: 'Wgrywanie...',
		WARNING: 'Ostrzeżenie!',
	},
	dialogs: {
		ADD_OPTION: 'Dodaj opcję',
		CLOSE_OPTIONS: 'Zamknij opcje',
		DELETE_NOTIFICATION_1: 'Czy jesteś pewien aby usunąć ten projekt?',
		DELETE_NOTIFICATION_2: 'Ta operacja jest nieodwracalna.',
		ENTER_NEW_CATEGORY: 'Wprowadź nową kategorię',
		MANAGE_OPTIONS: 'Zarządzaj opcjami',
	},
	errors: {
		CATEGORY_EXISTS: 'Kategoria już istnieje.',
		CATEGORY_NOT_FOUND: 'Kategoria nie została znaleziona.',
		CATEGORY_NAME_REQUIRED: 'Nazwa kategorii jest wymagana.',
		CATEGORY_USED:
			'Kategoria jest już użyta w projekcie. Nie można jej usunąć.',
		IMAGE_NOT_FOUND: 'Obrazek nie został znaleziony',
		PROJECT_NOT_FOUND: 'Projekt nie został znaleziony',
		UNAUTHORIZED_ACCESS: 'Nieautoryzowany dostęp do tego projektu',
	},
	forms: {
		CATEGORY_LABEL: 'Kategoria',
		CATEGORY_PLACEHOLDER: 'Wprowadź kategorię',
		INFORMATION_LABEL: 'Informacja',
		INFORMATION_PLACEHOLDER: 'Wprowadź informację',
		SEARCH_PROJECTS: 'Wyszukaj projekty',
		SELECT_A_VALUE: 'Wybierz wartość',
		SHOW_ONLY_MY_PROJECTS: 'Pokaż tylko moje projekty',
		TITLE_LABEL: 'Tytuł',
		TITLE_PLACEHOLDER: 'Wprowadź tytuł',
		UPLOAD_IMAGE: 'Załaduj obrazek',
		UPLOAD_IMAGES: 'Załaduj obrazki',
	},
	manipulations: {
		COVER_CREATE: 'Ustaw jako okładkę',
		COVER_DELETE: 'Usuń okładkę projektu',
		IMAGE_DELETE: 'Usuń obrazek',
		IMAGE_UPDATE: 'Wymień obrazek',
		PROJECT_DELETE: 'Usuń projekt',
		PROJECT_UPDATE: 'Edytuj informacje',
	},
	menu: {
		ADD: 'Dodaj projekt',
		ADMIN: 'Admin',
		KANBAN: 'Kanban',
		PROFILE: 'Mój profil',
		SEARCH: 'Wyszukaj',
		SORT_CUSTOM: 'Sortuj dowolnie',
		SORT_DATE: 'Sortuj po dacie',
		SORT_OPTIONS: 'Opcje sortowania',
		SORT_TITLE: 'Sortuj po tytule',
		SORT_USER: 'Sortuj po użytkowniku',
		SORT: 'Sortuj',
		THEME: 'Temat',
		THEME_DARK: 'Ciemny',
		THEME_LIGHT: 'Jasny',
		THEME_SYSTEM: 'System',
	},
	shared: {
		DND: 'Przeciągnij i upuść lub',
		SELECT_IMAGE: 'Wybierz obrazek',
		SELECT_IMAGES: 'Wybierz obrazki',
	},
	toasts: {
		CATEGORY_ADDED: 'została dodana.',
		CATEGORY_DELETED: 'została usunięta.',
		CATEGORY_UPDATED: 'została zaaktualizowana.',
		CATEGORY: 'Kategoria',
		IMAGE_ADDED: 'został dodany.',
		IMAGE_COVER_REMOVE: 'Okładka została usunięta.',
		IMAGE_COVER_SET: 'został ustawiony jako okładka.',
		IMAGE_DELETED: 'został usunięty.',
		IMAGE_UPDATED: 'został zaktualizowany na',
		IMAGE_UPLOAD_FAILED: 'Ładowanie obrazka zakończone niepowodzeniem.',
		IMAGE: 'Obrazek',
		PROJECT_ADDED: 'został dodany.',
		PROJECT_DELETED: 'został usunięty.',
		PROJECT_UPDATED: 'został zaktualizowany.',
		PROJECT: 'Projekt',
	},
	zod: {
		CATEGORY: 'Kategoria jest wymagana',
		INFO: 'Informacja musi zawierać co najmniej 3 znaki',
		TITLE: 'Tytuł musi zawierać co najmniej 3 znaki',
	},
}
