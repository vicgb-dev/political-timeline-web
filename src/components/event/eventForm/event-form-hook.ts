import { Topic } from '../../../models/topic.interface'
import { Source } from '../../../models/source.interface'
import { useEffect, useState } from 'react'

export function useEventForm () {
  const [topic, setTopic] = useState<Topic>()
  const [title, setTitle] = useState<string>()
  const [summary, setSummary] = useState<string>()
  const [sources, setSources] = useState<Source[]>()
  const [article, setArticle] = useState<any[]>()

  function onSubmit () {
    console.log('SUBMITTING')
    console.log('topic', topic)
    console.log('title', title)
    console.log('summary', summary)
    console.log('sources', sources)
    console.log('article', article)
  }

  useEffect(() => {
    console.log('article', article)
  }, [article])

  return {
    topic,
    setTopic,
    title,
    setTitle,
    summary,
    setSummary,
    sources,
    setSources,
    article,
    setArticle,
    onSubmit
  }
}
