import React from 'react'

function Genre() {
  return (
    <div>Genre</div>
  )
}

export default Genre

export const getStaticPaths = async () => {
    return {
        paths: [
            { params: {} }
        ],
        fallback: true
    }
}


export const getStaticProps = async (context) => {
    return {
        props: {}
    }
}
