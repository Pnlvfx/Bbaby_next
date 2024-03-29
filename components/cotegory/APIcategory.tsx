import { catchError } from '../API/common'
import { server } from '../main/config'

export const getCategories = async () => {
  try {
    const url = `${server}/categories`
    const res = await fetch(url, {
      method: 'get',
      credentials: 'include',
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.msg)
    return data
  } catch (err) {
    throw catchError(err)
  }
}
