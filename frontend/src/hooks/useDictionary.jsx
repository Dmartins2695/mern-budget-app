import { useState } from 'react'
import dictionary from '../config/dictionary'

const useDictionary = (initialLang = 'en') => {
	const [language, setLanguage] = useState(initialLang)

	const labelIn = (key) => dictionary[language][key] || key

	return { labelIn, setLanguage }
}

export default useDictionary
