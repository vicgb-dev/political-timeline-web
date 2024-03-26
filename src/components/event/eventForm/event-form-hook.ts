import { Topic } from '../../../models/topic.interface'
import { Source } from '../../../models/source.interface'
import { useEffect, useState } from 'react'
import { PublicFigure } from '../../../models/public-figure.interface'

export function useEventForm () {
  const [topic, setTopic] = useState<Topic>()
  const [title, setTitle] = useState<string>()
  const [summary, setSummary] = useState<string>()
  const [sources, setSources] = useState<Source[]>()
  const [article, setArticle] = useState<any[]>()

  const [publicFigures, setPublicFigures] = useState<PublicFigure[]>([])

  function addPublicFigure (publicFigure: PublicFigure) {
    setPublicFigures([...publicFigures, publicFigure])
  }

  function onSubmit () {
    console.log('SUBMITTING')
    console.log('topic', topic)
    console.log('title', title)
    console.log('summary', summary)
    console.log('sources', sources)
    console.log('article', article)
  }

  useEffect(() => {
    console.log('publicFigures', publicFigures)
  }, [publicFigures])

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
    addPublicFigure,
    onSubmit
  }
}
