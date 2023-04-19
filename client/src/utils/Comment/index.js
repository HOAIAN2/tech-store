import request from '../api-config'

async function getComments(productID, sortMode, startIndex) {
    try {
        const comments = await request.get('/comment', {
            params: {
                productID: productID,
                sortMode: sortMode,
                startIndex: startIndex
            }
        })
        return comments.data
    } catch (error) {
        throw new Error(error)
    }
}

export {
    getComments
}