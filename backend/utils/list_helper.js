const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const reducer = (sum, item) => {
    return sum + item
  }

  const likesArr = blogs.map(blog => blog.likes)

  return likesArr.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const likesArr = blogs.map(blog => blog.likes)
  let max = 0
  let maxIndex = 0
  console.log(likesArr)

  likesArr.forEach((element, index) => {
    if(element > max) {
      max = element
      maxIndex = index
    }
  })

  return blogs.at(maxIndex)

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}