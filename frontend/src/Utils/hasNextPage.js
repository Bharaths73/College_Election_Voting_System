export default function hasNextPage(items) {
  if (!items.length) {
    return false
  }

  const pageInfo = items[0]
  if (typeof pageInfo.hasNextPage === 'boolean') {
    return pageInfo.hasNextPage
  }

  const isLastPage = pageInfo.lastPage ?? pageInfo.isLastPage
  return typeof isLastPage === 'boolean' ? !isLastPage : true
}
