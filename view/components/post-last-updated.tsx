'use client'

import { formatDate } from '@/lib/utils'

interface IPostLastUpdated {
	date: string
}

function PostLastUpdated({ date }: IPostLastUpdated) {
	return <>{date && <div className="py-10 text-right text-sm">Last updated:&nbsp;{formatDate(date)}</div>}</>
}

export default PostLastUpdated
