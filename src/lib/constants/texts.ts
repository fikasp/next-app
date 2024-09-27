import { PL } from '@/lib/constants/locale/PL'
import { EN } from '@/lib/constants/locale/EN'
import { Lang } from '@/lib/types/enums'
import { TXT } from '@/lib/types/texts'

const lang = Lang.EN
const texts: Record<Lang, TXT> = {
	[Lang.PL]: PL,
	[Lang.EN]: EN,
}

export const txt = texts[lang]
